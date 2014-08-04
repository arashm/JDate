var co = require('co')

var chanel = require('./../lib/index')

describe('Parallel Channel', function () {
  describe('when discard=false', function () {
    it('should flush empty streams', co(function* () {
      var ch = chanel()
      yield ch(true)
    }))

    it('should return the results', co(function* () {
      var ch = chanel()
      var vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

      vals.forEach(function (i) {
        ch.push(get(i))
      })

      var results = yield ch(true)
      results.should.eql(vals)
    }))

    it('should throw errors in order', co(function* () {
      var ch = chanel()
      ch.push(get(0))
      ch.push(get(1))
      ch.push(get(2))
      ch.push(error())

      0..should.equal(yield ch)
      1..should.equal(yield ch)
      2..should.equal(yield ch)

      try {
        yield ch
        throw new Error('WTF')
      } catch (err) {
        err.message.should.equal('boom')
      }
    }))

    it('should retain concurrency', co(function* () {
      var ch = chanel()
      ch.concurrency = 2

      var vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      var pending = 0

      vals.forEach(function (i) {
        ch.push(function (done) {
          pending++
          setTimeout(function () {
            pending--
            pending.should.be.below(3)
            done(null, i)
          }, Math.random() * 10)
        })
      })

      var results = yield ch(true)
      results.should.eql(vals)
    }))

    describe('when an error occurs', function () {
      it('should stop executing callbacks', co(function* () {
        var ch = chanel()
        ch.concurrency = 1

        ch.push(get(0))
        ch.push(get(1))
        ch.push(get(2))
        ch.push(error())
        ch.push(get(4))
        ch.push(get(5))

        try {
          yield ch(true)
          throw new Error('wtf')
        } catch (err) {
          err.message.should.equal('boom')
        }

        yield wait(20)

        ch.fns.length.should.equal(2)
        ;(4 in ch.results).should.not.be.ok
        ;(5 in ch.results).should.not.be.ok
      }))

      it('should continue executing callbacks after reading', co(function* () {
        var ch = chanel()
        ch.concurrency = 1

        ch.push(get(0))
        ch.push(get(1))
        ch.push(get(2))
        ch.push(error())
        ch.push(get(4))
        ch.push(get(5))

        try {
          yield ch(true)
          throw new Error('wtf')
        } catch (err) {
          err.message.should.equal('boom')
        }

        var res = yield ch(true)
        res.should.eql([4, 5])
      }))
    })
  })

  describe('when discard=true', function () {
    it('should flush empty streams', co(function* () {
      var ch = chanel({
        discard: true
      })
      yield ch(true)
    }))

    it('should not return the results', co(function* () {
      var ch = chanel({
        discard: true
      })
      var vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

      vals.forEach(function (i) {
        ch.push(get(i))
      })

      var res = yield ch(true)
      ;(res == null).should.be.ok
    }))

    it('should throw errors', co(function* () {
      var ch = chanel()
      ch.discard = true
      ch.push(get(0))
      ch.push(get(1))
      ch.push(get(2))
      ch.push(error())

      try {
        yield ch(true)
        throw new Error('WTF')
      } catch (err) {
        err.message.should.equal('boom')
      }
    }))

    it('should retain concurrency', co(function* () {
      var ch = chanel()
      ch.concurrency = 2
      ch.discard = true

      var vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      var pending = 0

      vals.forEach(function (i) {
        ch.push(function (done) {
          pending++
          setTimeout(function () {
            pending--
            pending.should.be.below(3)
            done(null, i)
          }, Math.random() * 10)
        })
      })

      yield ch(true)
    }))

    describe('when an error occurs', function () {
      it('should stop executing callbacks', co(function* () {
        var ch = chanel()
        ch.concurrency = 1
        ch.discard = true

        ch.push(get(0))
        ch.push(get(1))
        ch.push(get(2))
        ch.push(error())
        ch.push(get(4))
        ch.push(get(5))

        try {
          yield ch(true)
          throw new Error('wtf')
        } catch (err) {
          err.message.should.equal('boom')
        }

        yield wait(20)
        ch.fns.length.should.equal(2)
      }))

      it('should continue executing callbacks after reading', co(function* () {
        var ch = chanel()
        ch.concurrency = 1
        ch.discard = true

        ch.push(get(0))
        ch.push(get(1))
        ch.push(get(2))
        ch.push(error())
        ch.push(get(4))
        ch.push(get(5))

        try {
          yield ch(true)
          throw new Error('wtf')
        } catch (err) {
          err.message.should.equal('boom')
        }

        var res = yield ch(true)
        ch.fns.length.should.equal(0)
      }))
    })
  })

  describe('when the channel is opened', function () {
    it('should wait indefinitely for the next result', function (done) {
      var ch = chanel()
      ch.concurrency = 1
      ch.open()

      co(function* () {
        yield wait(10)
        ch.push(get(0))
        ch.push(get(1))
        ch.push(get(2))
        ch.close()
      })()

      co(function* () {
        if (!(yield ch.pushed)) return
        var res = yield ch(true)
        res.should.eql([0, 1, 2])
      })(done)
    })

    it('should work with empty channels', function (done) {
      var ch = chanel()
      ch.open()
      setTimeout(function () {
        ch.close()
      }, 10)

      co(function* () {
        if (!(yield ch.pushed)) return
        yield ch(true)
      })(done)
    })

    it('should yield when closed', function (done) {
      var ch = chanel()
      ch.open()
      setImmediate(function () {
        ch.push(get(0))
        ch.push(get(1))
      })

      setTimeout(function () {
        ch.close()
      }, 20)

      co(function* () {
        if (!(yield ch.pushed)) return
        yield ch(true)
      })(done)
    })
  })
})

function wait(ms) {
  return function (done) {
    setTimeout(done, ms)
  }
}

function get(x) {
  return function (done) {
    setTimeout(function () {
      done(null, x)
    }, Math.random() * 10)
  }
}

function error(msg) {
  return function (done) {
    setTimeout(function () {
      done(new Error(msg || 'boom'))
    }, Math.random() * 10)
  }
}
