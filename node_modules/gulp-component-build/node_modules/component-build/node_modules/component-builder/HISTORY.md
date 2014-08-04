
1.1.9 / 2014-07-17
==================

 * bump version of css-url-rewriter to v0.1.0 due to underlying enhancements

1.1.8 / 2014-07-16
==================

 * bump version of syntax-error to v1.1.1 due to security issue
 * better error detail from syntax-error ParseError.annotated

1.1.7 / 2014-06-18
==================

 * added components to .npmignore
 * return normalized url from util.rewiteUrl, added css-url-rewriting-locals test

1.1.6 / 2014-05-29
==================

 * pinned regenerator to 0.4.6 to build working release
 * updated .npmignore to ignore `docs` and `examples` for release
 * updated Makefile `clean` to remove `components` dir

1.1.5 / 2014-04-22
==================

 * fix when component names don't match repo

1.1.4 / 2014-04-21
==================

 * fix CSS file.string error

1.1.3 / 2014-04-17
==================

 * fix url(url(-bug @aaronz8

1.1.2 / 2014-04-06
==================

 * build.scripts.canonical now returns the tree, not the canonical name
 * fix UMD wrap formatting

1.1.1 / 2014-04-06
==================

 * fix local file rewriting

1.1.0 / 2014-04-05
==================

So you don't have to include this for every custom `build.js`.

 * include build.scripts.canonical from build.js
 * include build.scripts.umd from build.js

1.0.4 / 2014-04-04
==================

 * fix components whose name does not match the repo name (such as page.js)

1.0.3 / 2014-04-01
==================

 * fix mix-cased `require()`s with mix-cased filenames - https://github.com/component/builder2.js/pull/34

1.0.2 / 2014-04-01
==================

 * fix `undefined`s when a relative URL can not be resolved - https://github.com/component/component/issues/499#issuecomment-39289681
