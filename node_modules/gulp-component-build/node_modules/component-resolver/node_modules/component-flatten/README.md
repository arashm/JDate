# Component Flatten

`.flatten()` command in [component-resolver](https://github.com/component/resolver.js). Stored in a separate repo for standalone usage, but tests are included in `resolver.js` for simplicity. Use `npm link` to test.

The purpose of this method is to:

- Flatten the dependency tree into the proper build order. The proper build order is (specifically for CSS):
  1. Remotes dependencies
  2. Local dependencies
  3. Component's files
- Check for multiple versions of a remote dependency

## API

```js
var resolver = require('component-resolver');
var flatten = require('flatten');

resolver().getTree(function (err, tree) {
  if (err) throw err;
  var branches = flatten(tree);
  // do stuff with the branches
})
```

### var nodes[] = flatten(tree)

`tree` is the result of `resolver`'s `.tree()` or `.getTree()` methods. Nodes will also be populated with:

- `.duplicates` - an object containing remote dependencies with multiple versions

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
