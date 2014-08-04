
# requires

  Super simple require parser, trades correctness for speed. If you
  do weird things like concat strings for require()s this will fail.

## Installation

```
$ npm install requires
```

## Example

js:

```js
var a = require('./a.js');
var b = require('./something/here/whoop');
var c = require("something");
```

parser output:

```js
[
  {
    "string": "require('./a.js')",
    "path": "./a.js",
    "index": 9
  },
  {
    "string": "require('./something/here/whoop')",
    "path": "./something/here/whoop",
    "index": 36
  },
  {
    "string": "require(\"something\")",
    "path": "something",
    "index": 79
  }
]
```

# License

  MIT