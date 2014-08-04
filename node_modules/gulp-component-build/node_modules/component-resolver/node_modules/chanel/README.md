# chanel [![Build Status](https://travis-ci.org/cojs/chanel.png)](https://travis-ci.org/cojs/chanel)

Javascript concurrency and order-preserving channels. You can consider this a streaming `async.parallel` with concurrency control that returns results __in the correct order__. Or a transform stream that executes multiple "transforms" at once.

This is very similar to other libraries like [batch](https://github.com/visionmedia/batch) and [co-queue](https://github.com/segmentio/co-queue) except:

- You can push jobs and pull data while tasks are in progress
- You don't have to wait until all the callbacks are finished to start reading data
- You don't have to wait until you define all or even any callbacks to begin reading
- Concurrency control (`Infinity` by default)
- Data will always be returned in the correct order
- You can discard data

The general use-case is concatenating files (as the example above).

```js
var chanel = require('chanel')

co(function* () {
  var ch = chanel()
  // only two file descriptors open at a time
  ch.concurrency = 2

  var files = [
    '1.txt',
    '2.txt',
    '3.txt',
    '4.txt',
    '5.txt',
    '6.txt',
  ]

  // create and push the functions or "tasks"
  files.forEach(function (filename) {
    ch.push(function (done) {
      fs.readFile(filename, 'utf8', done)
    })
  })

  while (ch.readable) {
    // write each file to stdout in order
    process.stdout.write(yield ch)
  }

  // exit the process (unnecessary)
  process.exit()
})()
```

or concatenate them all with:

```js
var results = yield ch(true)
var string = results.join('')
```

For this specific example, you're better off using [combine-streams](https://github.com/stream-utils/combine-streams), but there are use-cases where you need to buffer the entire file such as build systems with compilation steps.

## API

### var ch = chanel([options])

- `concurrency` <Infinity> - maximum number of concurrent callbacks
- `discard` <false> - discard the results of the callbacks. Will only throw errors, if any, if `true`.
- `closed` or `open` - by default, the channel is closed, meaning `yield ch(true)` will flush only the remaining callbacks. If opened, `yield ch(true)` will not yield until the channel is closed.

### ch.push(fn)

Push a thunk to the channel. If the thunk returns multiple arguments, it will be sliced into an array (just like co).

### var result = yield ch

Pull the next value in the channel. This waits for the next result in the channel indefinitely whether or not the channel is closed.

If an error was thrown, this function will return that error, and no more additional callbacks will be executed. To continue executing callbacks, just `yield ch` again.

If `ch.discard === false`, errors will be returned in the correct order. Otherwise, errors will be returned ASAP.

Note that this is a function. If you are not using generators, you can do something recursive like:

```js
ch(function next(err, res) {
  if (err) throw err;
  if (res) console.log(res);
  if (ch.readable) ch(next);
  process.exit();
});
```

When using `co` generators, you can just `yield` it.

```js
co(function* () {
  while (ch.readable) console.log(yield ch);
})
```

### var results = yield ch(true)

Waits until all the pending callbacks are completed. I personally call this "flushing the channel". Unless you are discarding data, all the results of the callbacks will be returned as the array `results`.

This is essentially the "give me everything method". Without generators, you can do:

```js
ch(true, function (err, results) {

})
```

### ch.queue

Number of results waiting to be read.

### ch.readable

A boolean to check whether you can `yield* ch.read()`. Otherwise, a `yield* ch.read()` call may never be yielded.

### ch.closed

Whether the channel is closed. `true` by default.

### ch.open()

Opens the channel. When the channel is opened, `yield ch(true)` will not `yield` until the channel is closed.

### ch.close()

Closes the channel.

### yield ch.pushed

If the channel is closed, `yield`s immediately.
If the channel is opened, returns `true` if data has been pushed and returns `false` if the channel has been closed, which means there is no data to read.

If you're using an open channel, you want to wait until `yield ch.pushed` before you start reading the data.
