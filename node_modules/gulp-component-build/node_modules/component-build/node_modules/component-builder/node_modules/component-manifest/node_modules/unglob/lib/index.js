var glob = require('glob')
var minimatch = require('minimatch')

exports.directory = function* (list, root) {
  var arr = list.slice()
  yield list.map(function (item, i) {
    if (!hasGlob(item)) return
    return function (done) {
      glob(item, {
        cwd: root
      }, function (err, matches) {
        if (err) return done(err)
        arr[i] = matches
        done()
      })
    }
  }).filter(Boolean)
  return flatten(arr)
}

exports.list = function (list, files) {
  var arr = list.slice()
  arr.forEach(function (item, i) {
    if (!hasGlob(item)) return
    arr[i] = minimatch.match(files, item, {})
  })
  return flatten(arr)
}

function flatten(arr, out) {
  out = out || []
  arr.forEach(function (val) {
    if (Array.isArray(val)) flatten(val, out)
    else out.push(val)
  })
  return out
}

function hasGlob(x) {
  return ~x.indexOf('*')
}