var vm = require('vm')
var co = require('co')
var assert = require('assert')
var resolve = require('component-resolver')
var Builder = require('component-builder')
var join = require('path').join
var should = require('should')
var inspect = require('util').inspect

var es6modules = require('..');

var options = {
  install: true
}

function fixture(name) {
  return join(__dirname, 'fixtures', name)
}

function* build(nodes, options) {
  js = Builder.scripts.require

  js += yield new Builder.scripts(nodes, options)
    .use('scripts',
      es6modules(),
      Builder.plugins.js())
    .end()

  return js
}

describe('modules', function () {
  var tree
  var js

  it('should install', co(function* () {
    tree = yield* resolve(fixture('import-default-from-cjs'), options)
  }))

  it('should build', co(function* () {
    js += yield build(tree)
  }))

  it('should execute', function () {
    var ctx = vm.createContext()
    vm.runInContext(js, ctx)
  })
})

describe('export', function () {
  it('should export default', co(function* () {
    tree = yield* resolve(fixture('export-default'), options)
    js = yield build(tree)
    var ctx = vm.createContext()
    vm.runInContext(js, ctx)
    ctx.require('export-default').should.containEql('prop')
  }))

  it('should export', co(function* () {
    tree = yield* resolve(fixture('export'), options)
    js = yield build(tree)
    var ctx = vm.createContext()
    vm.runInContext(js, ctx)
    ctx.require('export').fn().should.be.eql(13)
  }))
})

describe('import', function () {
  it('should import all', co(function* () {
    tree = yield* resolve(fixture('import-default-from-cjs'), options)
    js = yield build(tree)
    var ctx = vm.createContext()
    vm.runInContext(js, ctx)
    var Emitter = ctx.require('import-default-from-cjs')
    should(Emitter).be.a.Function
  }))

  it('should import a subset', co(function* () {
    tree = yield* resolve(fixture('import-from-cjs'), options)
    js = yield build(tree)
    var ctx = vm.createContext()
    vm.runInContext(js, ctx)
    var array = ctx.require('import-from-cjs')
    should(array).be.a.Function
  }))
})
