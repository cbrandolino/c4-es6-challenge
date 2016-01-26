 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
    entry: ['./src/main.es6'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "main.js"
    },
    module: {
        loaders: [
            {
                test: /\.es6$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
 };
