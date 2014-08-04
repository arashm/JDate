
var Downloader = require('./downloader');

require('./fields');
require('./archive');
require('./download');

module.exports = function downloader(options) {
  var downloader = download.downloader = new Downloader(options);
  return download;

  function download(remotes, repo, ref, archive) {
    return downloader.download(remotes, repo, ref, archive);
  }
}