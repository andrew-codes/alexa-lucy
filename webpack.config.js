const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
       './src/client/entry.js'
    ],
    output: {
        path: path.join(__dirname, 'src', 'public', 'js'),
        filename: 'bundle.js',
        publicPath: '/js/'
    },
    plugins: [
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }]
    }
};
