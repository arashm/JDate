const webpack = require('webpack');

module.exports = {
  entry: {
    'jdate': __dirname + '/src/jdate.js',
    'jdate.min': __dirname + '/src/jdate.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: '[name].js',
    library: 'jdate',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {exclude: ['node_modules'], loader: 'babel-loader', test: /\.js$/},
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
