# component-resolver [![Build Status](https://travis-ci.org/component/resolver.js.png)](https://travis-ci.org/component/resolver.js)

Resolve a component's dependency tree.

- Relies on components' newer [specs](https://github.com/component/spec)
- Validates and normalizes `component.json`s
- Supports installing components
- Supports globs for both remote and local components
- Supports semver resolution for dependencies

This uses:

- [remotes](https://github.com/component/remotes.js) - normalize remote end points
- [downloader](https://github.com/component/downloader.js) - downloads repositories
- [flatten](https://github.com/component/flatten.js) - flatten a dependency tree into a list
- [validator](https://github.com/component/validator.js) - validate `component.json`s

## Example

```js
var resolve = require('component-resolver');
var flatten = require('component-flatten');

resolve({
  // a "component.json"
  dependencies: {
    'component/emitter': '1.1.1'
  }
}, function (err, tree) {
  if (err) throw err;

  tree.dependencies['component/emitter'];
  /**
   * name: 'component/emitter'
   * version: '1.1.1'
   * ref: '1.1.1'
   */

   // flatten the dependency tree
   var nodes = flatten(tree);
   nodes[0].name === 'component/emitter';
});
```

## API

### resolve(component, [options], [callback])

`component` can be a "root" folder, `process.cwd()` by default. `component` can also be "component.json" object. This is useful for resolving dependencies without reading anything from disk. You __should__ at least set it to `null`.

The main `options` are:

- `root` <process.cwd()> - if `component.json` is an object, this will set the root.
- `remote` - a `remotes` instance. Defaults to the local `dir` and `github`.
- `local` <true> - try resolving against locally installed components. Only relevant if you don't set a remote.
- `development` <false> - include `development` in `local` components
- `dependencies` <true> - resolve dependencies
- `verbose` <false> - print warnings and status messages
- `concurrency` <{}> - an object with concurrency values for different channels. Defaults:

    - `locals: 16`
    - `dependencies: 5`
    - `semver: 1`
    - `installs: 5`
    - `downloads: 1`

Options passed to `component-downloader`:

- `install` <false> - install components to `out`
- `out` <`components`> - folder to install components to
- `fields` - fields of `component.json`s to download files, defaults to those defined in the spec
- `archive` - install entire repositories instead of just necessary files

`callback` is a function with signature `(err, tree)`. You if no callback is set, a generator is returned.

```js
resolve(root, options, function (err, tree) {

});

// or if you use generators

co(function* () {
  var tree = yield* resolve(root, options);
})();
```

### tree and branches

This resolver returns a `tree`. The tree consists of `branches` that connect `nodes`. Each `node` is the relevant `component.json`. Thus, you can view the `branches` as how each component relates to each other as well as additional metadata.

There are two types of branches: `local` for local components and `dependency` for remote components. Properties:

- `type` - either `local` or `dependency`
- `name`
- `canonical` - a canonical, unique name for this component. For remote dependencies, this is `<user>~<project>@<reference>`. For local components, this is the relative path from `root` to this component's `path`. `~` is used instead of `/` or `-` to ensure canonical names are in fact unique and do not look like paths.
- `dependencies` {} - remote dependencies of this component
- `locals` {} - local dependencies of this component
- `dependents` [] - dependents of this component
- `node` - the node's `component.json`
- `path` - the path of the component, not including `/component.json`.
- `filename` - the filename of this `component.json`
- `paths` - absolute `.paths` of this component. `paths` are inherited from their parent.
- `remotes` - list of remote names to lookup dependencies of this component. `remotes` are inherited from their parent.
- `resolvedRemotes` - a list of all the remotes, including this component's parents'

Locals additionally have:

- `relativePath` - relative path to the local component's folder resolved against `root`

Dependencies additionally have:

- `ref` - git reference such as `master`, `v1.0.0`, etc.
- `version` - the semantic version, if any

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