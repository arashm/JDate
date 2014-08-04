
var validate = require('./');

var options = {
  filename: __dirname
};

validate({
  name: 'LOL'
}, options);

validate({
  name: 'lkjasdf.kljasdf'
}, options);

validate({
  name: 'lkajsdf_lkjasldjkf'
}, options);

validate({
  name: 'klasdjf-askljdf'
}, options);

validate({
  local: [
    'a',
    'b'
  ]
}, options);

validate({
  repo: 'kljasdf/kljalksjdf'
}, options)

validate({
  development: {
    'component/emitter': "1.0.0"
  }
}, options);

try {
  validate({
    scripts: {}
  }, options);
  throw new Error('scripts validation FAILED');
} catch (err) {
  console.error(err.message);
}

try {
  validate({
    development: []
  }, options);
  throw new Error('development validation FAILED');
} catch (err) {
  console.error(err.message);
}

try {
  validate({
    dependencies: []
  }, options);
  throw new Error('dependencies validation FAILED');
} catch (err) {
  console.error(err.message);
}

try {
  validate({
    dependencies: {
      a: '*'
    }
  }, options);
  throw new Error('dependency name validation FAILED');
} catch (err) {
  console.error(err.message);
}
