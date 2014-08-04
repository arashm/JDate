var x = module.exports.x = 13;

function x() {
  return 13;
} module.exports.x = x;

function A(){"use strict";}
  A.prototype.foo=function() {"use strict";};
module.exports.A = A;

function x() {
  function A(){"use strict";}
    A.prototype.foo=function() {"use strict";};
  
} module.exports.x = x;

var x = module.exports.x = 11, y = module.exports.y = 12;

var X = module.exports.X(function(){function ____Class0(){"use strict";} ____Class0.prototype.render=function() {"use strict";}; return ____Class0;})()
