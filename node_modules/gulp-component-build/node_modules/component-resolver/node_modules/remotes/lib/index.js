
var fs = require('fs');
var path = require('path');

var Remotes = module.exports = require('./remotes');

// so you can do `var remotes = Remotes(Remotes.default)`
// anything else is probably too opinionated
Remotes.defaults = [
  'github',
  'bitbucket',
];

Remotes.Remote = require('./remote');

// name of the remotes
Remotes.remotes = [];

// automatically load all the remotes in lib/remotes/
fs.readdirSync(path.join(__dirname, 'remotes'))
.forEach(function (name) {
  if (name[0] === '.') return;

  // remove the `.js`
  name = name.slice(0, -3);
  Remotes[name] = require('./remotes/' + name);
  Remotes.remotes.push(name);
})
