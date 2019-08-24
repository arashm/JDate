const path = require('path');

module.exports = {
  entry: {
    jdate: path.join(__dirname, '/src/jdate.js')
  },
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '/lib'),
    filename: '[name].js',
    library: 'JDate',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'this'
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
