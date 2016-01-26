 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
    entry: { 
        main: './src/main.es6',
        test: './test/main.test.es6'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].js"
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
