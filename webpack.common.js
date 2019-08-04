const path = require('path');

module.exports = {
  entry: {
    jdate: path.join(__dirname, '/src/jdate.js')
  },
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '/lib'),
    filename: '[name].js',
    library: 'jdate',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
