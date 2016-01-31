const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/main.es6',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  module: {
    loaders: [
      {
        test: /(\.es6|\.js)$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
