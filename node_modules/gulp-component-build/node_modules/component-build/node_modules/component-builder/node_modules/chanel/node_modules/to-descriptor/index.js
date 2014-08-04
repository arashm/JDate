module.exports = function (source, out) {
  out = out || Object.create(null)
  Object.getOwnPropertyNames(source).forEach(function (name) {
    out[name] = Object.getOwnPropertyDescriptor(source, name)
  })
  return out
}