# unglob [![Build Status](https://travis-ci.org/cojs/unglob.svg?branch=master)](https://travis-ci.org/cojs/unglob)

Unglob a list of files/globs based on a directory (where fs calls will be made) or another list of files.

## Example

```js
var unglob = require('unglob')

var list = unglob.list([ // list to unglob
  'index.js',
  'lib/*.js'
], [ // list of files
  'index.js',
  'lib/index.js',
  'lib/util.js',
  'lib/text.md',
  'lib/image.png'
])

// => ['index.js', 'lib/index.js', 'lib/util.js']
```

## API

### var files = yield* unglob.directory(list, directory)

Unglobs a list of files/globs from a directory. It's a generator function. For example, suppose we're unglobbing this repository.

```js
var list = yield* unglob.list(['**/*.js'], __dirname)
list === [
  'index.js',
  'lib/index.js',
  'test/directory.js',
  'test/list.js'
]
```

### var files = yield* unglob.list(list, listOfFiles)

Unglobs a list of files/globs from a list of known files. This is synchronous. Useful if you already have the list of files as this won't use any file system calls.

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
