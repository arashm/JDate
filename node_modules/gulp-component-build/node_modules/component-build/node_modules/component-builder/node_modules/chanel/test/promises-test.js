'use strict';
if (!require('generator-supported')) return;

var co = require('co'),
  chanel = require('./../lib/index'),
  cowait = require('co-wait'),
  one2ten = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


function wait(ms) {
  return new Promise(function (resolve, reject) {
    try {
      setTimeout(resolve, ms)
      return this;
    } catch (e) {
      reject(e);
    }
  })
}

function get(x) {
  return new Promise(function (resolve, reject) {
    try {
      setTimeout(function () { resolve(x); } , Math.random() * 10)
    } catch (e) {
      reject(e);
    }
  })
}

function error(msg) {
  return wait( Math.random() * 10).then(function () { throw Error(msg || 'boom'); });
}


describe('Promises on a Chanel', function () {
  describe('when pushing promises', function () {
    it('should return the promised results', co(function* () {
      var ch = chanel()

      var p1= get(1);
      var x1 = yield p1;
      one2ten.forEach(function (i) {
        ch.push(get(i))
      })

      var results = yield ch(true)
      results.should.eql(one2ten)
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
      var pending = 0

      one2ten.forEach(function (i) {
        ch.push(function* () {
          pending++
          yield cowait(Math.random() * 10)
          pending--
          pending.should.be.below(3)
          return i;
        });
      });

      var results = yield ch(true)
      results.should.eql(one2ten)
    }));


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

        yield wait(20);

        ch.fns.length.should.equal(2);
        (4 in ch.results).should.not.be.ok;
        (5 in ch.results).should.not.be.ok;
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

      one2ten.forEach(function (i) {
        ch.push(get(i))
      })

      var res = yield ch(true)
        ;
      (res == null).should.be.ok
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
      ch.concurrency = 2;
      ch.discard = true;

      var pending = 0;

      one2ten.forEach(function (i) {
        ch.push(function* () {
          pending++;
          yield cowait(Math.random() * 10);
          pending--;
          pending.should.be.below(3);
          return i;
        });
      });

      yield ch(true);
    }));


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
