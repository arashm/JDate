
1.1.8 / 2014-07-26
==================

 * further to issue#12, only lookup non-local versions if not looking for '*' (master)

1.1.7 / 2014-07-21
==================

 * issue#12, check non-local remotes when semver not satisfied locally

1.1.6 / 2014-05-31
==================

 * bugfix local `branch.conanical` sep for deep paths

1.1.5 / 2014-05-29
==================

 * Updated `.npmignore` to ignore test residual `components` folder and `component.json`
 * Updated `./test/resolver.js` to cleanup temporary `component.json`

1.1.4 / 2014-05-26
==================

 * normalize local `branch.conanical` path separators to `/` for all platform
 * added tests

1.1.3 / 2014-05-12
==================

 * using regenerator 0.4.6 (pinned) to build a working release

1.1.2 / 2014-05-12
==================

 * adding `timeout` and `retries` to `remotes.options`

1.1.1 / 2014-04-07
==================

 * update for remotes.defaults
 * bump deps

1.1.0 / 2014-04-06
==================

 * add bitbucket support (@netpoetica)

1.0.3 / 2014-04-05
==================

 * link install errors to `component open troubleshooting`

1.0.2 / 2014-04-02
==================

 * change validator to only log during `component-validate`
 * bump deps

1.0.1 / 2014-04-02
==================

 * fix validate to always show filenames

0.2.0 / 2014-02-22
==================

- changed API signature
- add canonical names for each component
- use component-downloader
- refactor to component-flatten
