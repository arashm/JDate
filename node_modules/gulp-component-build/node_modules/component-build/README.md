# Component Build

This is a separate repo for the primary logic behind the `component-build` command.
Feel free to fork this or use it as a baseline to create your own builder.
This is a thin wrapper around `component-builder2`.

Some features included by default:

- Scripts

    - ES6 Module support
    - Syntax error checking
    - JSON files and JSON syntax error checking
    - Templates as strings
    - Autorequires the bundle by default
    - Optional UMD wrap
    - Resolves the entry point of the bundle automatically

- Styles

    - Automatic CSS autoprefixing
    - Rewrite CSS URLs/ against an arbitrary prefix

- Files

    - Choose to copy or symlink files

## API

### var build = Build(tree, options)

```js
var resolve = require('component-resolver');
var Build = require('component-build');

var write = fs.writeFileSync;

var options = {
  development: true,
  install: true,
}

resolve(process.cwd(), options, function (err, tree) {
  if (err) throw err;

  var build = Build(tree, options);

  build.scripts(function (err, string) {
    if (err) throw err;
    if (!string) return;
    write('build.js', string);
  })

  build.styles(function (err, string) {
    if (err) throw err;
    if (!string) return;
    write('build.css', string);
  })

  build.files(function (err) {
    if (err) throw err;
  })
})
```

`options` are passed to all builders and plugins.
Options other than those supported by `component-resolver` and `component-builder2` are:

- `prefix` <''> - for rewriting URLs in CSS
- `browsers` <''> - autoprefixer browser support
- `umd` <false> - wrap the build in a UMD build with name `umd`
- `autorequire` <true> - automatically require the entry point of the build

### build.set(key, value)

Set or change an option after initialization.

```js
build.set('development', false);
```

### build.scripts(callback)

Builds the JS.
Returns `function (err, js) {}` where `js` is the build string.
If nothing was built, `js === ''`.

### build.styles(callback)

Builds the CSS.
Returns `function (err, css) {}` where `css` is the build string.
If nothing was built, `css === ''`.

### build.files(callback)

Builds the files.
Returns `function (err) {}`.

### build.scriptPlugins(build, options)

Optionally override the default plugins used for `.js` builds.
`build` is a builder instance, and `options` are the options passed to `Build`.
You may overwrite this entirely if you'd like:

```js
var build = Build(tree, options);
build.scriptPlugins = function (build, options) {
  build
  .use('scripts',
    es6modules(options),
    plugins.js(options))
  .use('json',
    plugins.json(options))
  .use('templates',
    plugins.string(options));
};
build.scripts(function (err, js) {

});
```

You may also append or prepend plugins like so:

```js
var defaults = build.scriptPlugins;
build.scriptPlugins = function (build, options) {
  build.use('templates', jade(options));
  defaults(build, options);
  build.use('jade', jade(options));
}
```

`return`ing anything is NOT necessary.
Do NOT call `.end()`.

This method is available on both the constructor and the prototype:

```js
var Build = require('component-build');
Build.scriptPlugins === Build.prototype.scriptPlugins;
```

### build.stylePlugins(build, options)

Same as `build.scriptPlugins()`, but with `.css`.

### build.filePlugins(build, options)

Same as `build.scriptPlugins()`, but with the files.

## License

(The MIT License)

Copyright (c) 2014 segmentio &lt;team@segment.io&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
