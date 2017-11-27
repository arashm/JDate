const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    jdate: path.join(__dirname, '/src/jdate.js'),
    'jdate.min': path.join(__dirname, '/src/jdate.js')
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/lib'),
    filename: '[name].js',
    library: 'jdate',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      { exclude: ['node_modules'], loader: 'babel-loader', test: /\.js$/ }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
