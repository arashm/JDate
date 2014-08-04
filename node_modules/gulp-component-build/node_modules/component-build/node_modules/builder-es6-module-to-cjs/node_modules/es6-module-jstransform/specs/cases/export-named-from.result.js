module.exports.x = require("./mod.js").x;
var mod$0 = require("./mod.js");module.exports.x = mod$0.x;module.exports.y = mod$0.y;
module.exports.y = require("./mod.js").x;
var mod$1 = require("./mod.js");module.exports.y = mod$1.x;module.exports.b = mod$1.y;

var mod$2 = require("./mod.js");
module.exports.y = mod$2.x;
module.exports.b = mod$2.a;


var x = "should be on 11th line";
