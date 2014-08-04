# cogent [![Build Status](https://travis-ci.org/cojs/cogent.png)](https://travis-ci.org/cojs/cogent)

A simple HTTP request agent designed primarily for `GET`ing stuff.

Note: this library relies on [co](https://github.com/visionmedia/co), but does not depend on it directly. You need to install it yourself.

## Features

- Resolve redirects
- Proxy agent support
- Timeout support
- Automatic gunzipping
- First-class JSON support
- Buffer the response or save it to a file

## API

```js
var request = require('cogent')

var uri = 'https://raw.github.com/visionmedia/express/master/package.json'

// Pipe stdout
var res = yield* request(uri)
res.pipe(process.stdout)

// Save to a file
var res = yield* request(uri, require('os').tmpdir() + '/express.package.json')
if (res.destination) console.log('ok')

// Get as JSON
var res = yield* request(uri, true)
var json = res.body
```

You can also use it without generators by wrapping it with [co](https://github.com/visionmedia/co):

```js
var co = require('co')
var request = co(require('cogent'))

request('https://github.com', function (err, res) {
  res.pipe(process.stdout)
})
```

### var response = yield* request(url, [options])

`url` is the URL of the request.
The options are passed to [http.request()](http://nodejs.org/api/http.html#http_http_request_options_callback).
Additional options are:

- `buffer` - buffer the response and save it as `res.buffer`
- `string` - buffer the response as a string and save it as `res.text`
- `json` - buffer the response as an object and save it as `res.body`
- `destination` - cojs/cogent the response to the file `destination`
- `proxy` - a URL for a proxy server
- `timeout` - response header timeout per try, default `5000 milliseconds`
- `retries` - number of retries when request fails due to common server errors, default `0`
- `redirects` - resolve redirects, default `1`

If `options === true`, it defaults to `{ json: true }`.
If `typeof options === 'string'`, it defaults to `{ destination: string }`.

`response` will have the following properties:

- `res.req` - the request object
- `res.res` - the response object, itself if the response was not gzipped
- `res.statusCode`
- `res.headers`
- `res.destination` - populated only if the file was successfully saved on a `200`
- `res.buffer`
- `res.text`
- `res.body` - JSON body populated only on a `200`

### request = request.extend(options)

Create a new `cogent` instance with default options. This allows you to avoid setting the same options every time. See the options listed above.

- `retries`
- `redirects`
- `timeout`
- `method`
- `gunzip`
- `netrc`
- `agent`
- `proxy`


```js
var request = require('cogent').extend({
  auth: 'username:password'
})

var res = yield* request('http://localhost/', true)
// will send with auth header
```

## License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
