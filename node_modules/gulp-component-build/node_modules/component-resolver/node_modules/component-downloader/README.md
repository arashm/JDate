# Component Downloader [![Build Status](https://travis-ci.org/component/downloader.js.svg?branch=master)](https://travis-ci.org/component/downloader.js)

Downloads components based on [remotes](https://github.com/component/remotes.js).

- Either download a component based on specific fields, or just download the entire repository
- Unglobs all the fields of the `component.json`
- Normalizes the `component.json`
- Deletes corrupted installations

```js
var Downloader = require('component-downloader');
var downloader = Downloader({
  concurrency: 5, // 5 files at a time
  verbose: true,
});

co(function* () {
  yield* download('component/emitter', '1.0.0');
  // will be installed to components/component/emitter/1.0.0
})
```

If you don't want to use generators:

```js
var download = co(download);
download('component/emitter', '1.0.0', function (err) {
  if (err) throw err;
  console.log('downloaded!');
})
```

## API

### var download = downloader([options])

The `options` are:

- `dir` <`components`> - folder to download components to.
- `remotes` - remotes to download from. Defaults to only `github`.
- `fields` - `fields` to download and unglob. Defaults to those specificed in the specifications.
- `concurrency` <1> - number of concurrent file downloads.
- `verbose` <false> - log when installs start and finish.
- `archive` <archive> - download the entire repository instead of just the files specified in the `fields`.
- `maxFiles` <10> - maximum number of files to download before just downloading the entire repository.

### yield* download([remotes], repo, ref, [archive])

- `remotes` - array of remote names to download from
- `repo`
- `ref`
- `archive` - download the entire repository

## License

The MIT License (MIT)

Copyright (c) 2014 Jonathan Ong me@jongleberry.com

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
