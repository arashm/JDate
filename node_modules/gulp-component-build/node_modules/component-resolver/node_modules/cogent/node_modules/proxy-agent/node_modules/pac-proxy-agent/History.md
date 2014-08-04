
0.1.2 / 2014-04-04
==================

  * package: update outdated dependencies

0.1.1 / 2014-02-03
==================

  * index: move the exports before the `require()` calls
  * index: minor code cleanup
  * index: better proxy string splitting logic

0.1.0 / 2014-01-25
==================

  * index: calculate an SHA1 hash of the JS code
  * index: pass the `sandbox` option in to PacResolver
  * index: remove final remnants of the `code` property
  * index: set the `filename` option when creating the resolver function
  * package: update to "pac-resolver" v1.1.0

0.0.2 / 2014-01-25
==================

  * package: be lax on the `proxy-agent` version
  * index: remove incomplete support for the `code` property

0.0.1 / 2014-01-12
==================

  * gitignore: ignore development test files
  * index: set `port` to null when it is the protocol default port (80 / 443)
  * index: better support for passing in an "options object"
  * index: add more debug() calls, store the `cache` reference
  * index: use `proxy-agent` for "PROXY" and "SOCKS"
  * add README.md file
  * initial code
