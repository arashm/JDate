# Remotes.js [![Build Status](https://travis-ci.org/component/remotes.js.png)](https://travis-ci.org/component/remotes.js)

The goal of this repo is to normalize different remote endpoints for Component into a unified API.
You can also create your own remote endpoints instead of shoehorning different APIs into a JSON file.
This also handles versions and git trees, which is a little more complicated than just github raw.

Example:

```js
var Remotes = require('remotes');
var remotes = Remotes();
remotes.use(new Remotes.Local({
  dir: 'components'
}));
remotes.use(new Remotes.GitHub({
  auth: 'jonathanong:password'
}));

co(function* () {
  // get the correct remote from a list of remotes
  var remote = yield* remotes.resolve('component/emitter');
  // return all the versions this remote has
  var versions = yield* remote.versions('component/emitter');
  // do stuff with the versions
})
```

A shortcut for the above is:

```js
var remotes = require('remotes')(['github'], {
  local: true,
  dir: 'components',
  netrc: '',
})
```

Where `netrc` points to a `netrc` file. See [netrc](https://github.com/CamShaft/netrc).

## Using Remotes

### var remotes = new Remotes([names], [options])

Returns a group of remotes. `names` is a list of redefined remotes. Note that order matters.

The current remotes are:

- `remotes.github`
- `remotes.bitbucket`
- `remotes.local` - use downloaded components

The list of names can be found at `Remotes.remotes`.

Some options are:

- `netrc` - for [netrc](https://github.com/CamShaft/netrc)
- `dir` - local `components` path. Defaults to `process.cwd() + '/components'
- `local` - use the `local` component.

### remotes.use(remote)

Add a remote to this list of remotes. Note that order matters.

### var remote = yield* remotes.resolve([names], repo, [ref])

Returns the first remote with `<repo>@<ref>` from the list of remotes. You may optionally pass `names`, a list of remote names, instead of searching all the remotes or to search in a different order.

### Authentication

Some remotes, such as GitHub, require authentication. We suggest you use [netrc](https://github.com/CamShaft/netrc).

For Github, you need to supply you username and password for the `api.github.com` host.
You may also set the `GITHUB_USERNAME` and `GITHUB_PASSWORD` environmental variables.
Similarly, for BitBucket, you set `BITBUCKET_USERNAME` and `BITBUCKET_PASSWORD`.

## Using a Remote

### remote.name

The name of the remote.

### var json = yield* remote.json(repo, [ref])

Return the `component.json` of a component from this remote.

### var versions = yield* remote.versions(repo)

Get all valid semver version of this remote.

### var tree = yield* remote.tree(repo, ref)

Return the git tree of this repo. Will return a list of objects with properties:

- `path` - file path in the repo
- `sha` - sha1 check sum
- `fize` - file byte length

### var urls = remote.file(repo, ref, path)

Return an array of absolute URLs of where to download this component's file `path`.

### var archive = remote.archive(repo, ref)

Return an object containing absolute URLs of where to download this repo's archive. `archive` is of the format `archive[format] = urls[]`. Example:

```js
{
  tar: [
    'https://api.github.com/repos/component/emitter/tarball/master',
  ],
  zip: [
    'https://api.github.com/repos/component/emitter/zipball/master',
  ]
}
```

## Remote Notes

- Only `master` is supported as the default branch.

### BitBucket

- Git trees are not supported, so please don't use globs in your `component.json`s!

## Creating your own Remote

You may create your own remote. See the [remotes](https://github.com/component/remotes.js/tree/master/lib/remotes/github.js) for implementation examples.

### Remotes.Remote.extend(Child)

Extend a new `Remote` class with the current Remote. Example:

```js
var Remote = require('remotes').Remote;

function GitHub(options) {
  options = options || {}
  Remote.call(this, options)

  this.something = 'asdf'
}

Remote.extend(GitHub)

Github.prototype.something = function () {

}
```

### Implementable Functions

The following properties must be implemented. Note that if you want a remote to be skipped, simply return `null`.

- `.name`
- `._json()`
- `._versions()`
- `._tree()`
- `.file()`
- `.archive()`

If a function is not supported, simply do not define it.
For example, BitBucket does not support git trees, so `._tree()` is not defined.

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
