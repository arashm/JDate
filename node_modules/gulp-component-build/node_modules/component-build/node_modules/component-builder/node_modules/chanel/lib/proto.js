var co = require('co');
var EventEmitter = require('events').EventEmitter

module.exports = Channel

function Channel(options) {
  options = options || {}

  EventEmitter.call(this, options)

  this.concurrency = options.concurrency || Infinity
  // closed by default
  this.closed = !(options.closed === false || options.open)
  this.discard = options.discard

  this.fns = []
  this.results = []

  this.fnIndex = 0
  this.resultIndex = 0
  this.pending = 0
  this.errors = 0

  this.reading = true
}

Object.defineProperty(Channel.prototype, 'pushable', {
  get: function () {
    return this.reading && this.pending < this.concurrency
  }
})

// read queue
Object.defineProperty(Channel.prototype, 'queue', {
  get: function () {
    var queue = this.results.length + this.fns.length
    if (this.discard) queue += this.pending
    return queue
  }
})

// you can read from a channel if there's a read queue or if this channel is not closed
Object.defineProperty(Channel.prototype, 'readable', {
  get: function () {
    return this.queue || !this.closed
  }
})

Channel.prototype.open = function () {
  this.closed = false
  this.emit('open')
  return this
}

Channel.prototype.close = function () {
  this.closed = true
  this.emit('close')
  return this
}

// when the channel is open,
// wait for the first push event (returns true)
// or close event (returns false)
Channel.prototype.pushed = function (done) {
  if (this.closed) return done(null, false)
  if (this.queue) return done(null, true)

  var self = this
  this.on('close', close)
  this.on('push', push)

  function close() {
    cleanup()
    done(null, false)
  }

  function push() {
    cleanup()
    done(null, true)
  }

  function cleanup() {
    self.removeListener('close', close)
    self.removeListener('push', push)
  }
}

/**
 * Push a function to the channel.
 * If `null`, just means closing the channel.
 */

Channel.prototype.push = function (fn) {
  if (fn == null) return this.close()

  // Handle Promises
  if (fn && 'function' == typeof fn.then) {
    var p = fn;
    fn = function(f1) { p.then(function (res) { f1(null, res); }, f1); };
  }

  var isNakedGenerators = Object.getPrototypeOf(fn).name === 'GeneratorFunctionPrototype';
  var isGeneratorFunction = 'function' == typeof fn.next && 'function' == typeof fn.throw;
  if (isNakedGenerators || isGeneratorFunction)
    fn = co(fn);

  if (typeof fn !== 'function')
    throw new TypeError('you may only push functions')

  this.fns.push(fn)
  if (!this.discard) this.results.length++
  this._call()
  this.emit('push')
  return this
}

Channel.prototype._call = function () {
  if (!this.pushable) return
  if (!this.fns.length) return

  var fn = this.fns.shift()
  var index = this.fnIndex++
  this.pending++

  var self = this
  fn(function (err, res) {
    self.pending--
    if (err) {
      self.reading = false
      self.errors++
      if (self.discard) {
        self.results.push(err)
      } else {
        self.results[index - self.resultIndex] = err
      }
    } else if (!self.discard) {
      self.results[index - self.resultIndex] = arguments.length > 2
        ? [].slice.call(arguments, 1)
        : res
    }

    self.emit(String(index))
    self.emit('callback')
    self._call()
  })
}

Channel.prototype._read = function (done) {
  var results = this.results
  // continue executing callbacks if no errors occured
  if (!this.reading && !this.errors) this.reading = true

  if (!this.discard) {
    if (results.length && 0 in results) {
      var res = results.shift()
      this.resultIndex++
      if (res instanceof Error) {
        this.errors--
        done(res)
      } else {
        done(null, res)
      }
      return
    }
  } else if (results.length) {
    // these can only be errors
    this.errors--
    done(results.shift())
    return
  }

  // wait for the next result in the queue
  this._next(done)
}

Channel.prototype._next = function (done) {
  var event = this.discard
    ? 'callback'
    : String(this.resultIndex)

  var self = this
  this.once(event, onevent)
  if (!this.closed && !this.queue) this.once('close', onclose)

  function onevent() {
    cleanup()
    if (!this.discard) {
      var res = this.results.shift()
      this.resultIndex++
      if (res instanceof Error) {
        this.errors--
        done(res)
      } else {
        done(null, res)
      }
    } else if (this.results.length) {
      // these can only be errors
      this.errors--
      done(this.results.shift())
    } else {
      done()
    }
  }

  function onclose() {
    cleanup()
    done()
  }

  function cleanup() {
    self.removeListener(event, onevent)
    self.removeListener('close', onclose)
  }
}

Channel.prototype._flush = function () {
  if (this.discard) return this._flushDiscard.bind(this)
  else return this._flushResults.bind(this)
}

Channel.prototype._flushDiscard = function (done) {
  var read = this
  if (!read.closed) {
    read.pushed(function (err, pushed) {
      if (!pushed) done()
      else read(next)
    })
  } else if (!read.readable) {
    done()
  } else {
    read(next)
  }
  function next(err) {
    if (err) done(err)
    else if (!read.readable) done()
    else read(next)
  }
}

Channel.prototype._flushResults = function (done) {
  var read = this
  var results = []
  if (!read.closed) {
    read.pushed(function (err, pushed) {
      if (!pushed) done()
      else read(next)
    })
  } else if (!read.readable) {
    done()
  } else {
    read(next)
  }
  function next(err, res) {
    if (err) return done(err)

    results.push(res)
    if (read.readable) return read(next)
    done(null, results)
  }
}
