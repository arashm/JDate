
var requires = require('..');
var fs = require('fs');

describe('requires(str)', function(){
  it('should return an array of require paths', function(){
    var a = fs.readFileSync('test/fixtures/a.js', 'utf8');
    var ret = requires(a);

    ret[0].should.eql({
      string: "require('./a.js')",
      path: './a.js',
      index: 9
    });

    ret[1].should.eql({
      string: "require('./something/here/whoop')",
      path: './something/here/whoop',
      index: 36
    });

    ret[2].should.eql({
      string: "require(\"something\")",
      path: 'something',
      index: 79
    });
  })

  it('should skip require in comments', function(){
    var a = fs.readFileSync('test/fixtures/comment.js', 'utf8');
    var ret = requires(a);

    ret.length.should.eql(1);
    ret[0].should.eql({
      string: "require('./b.js')",
      path: './b.js',
      index: 3
    });
  });
})

describe('requires(str, fn)', function(){
  it('should replace requires', function(){
    var a = fs.readFileSync('test/fixtures/a.js', 'utf8');
    
    var str = requires(a, function(require){
      return 'require("woot/' + require.path + '")';
    });

    str.should.include('var a = require("woot/./a.js");');
    str.should.include('var b = require("woot/./something/here/whoop");');
  })
})
