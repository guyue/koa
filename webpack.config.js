var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var autoprefixer = require('autoprefixer');

module.exports = {
    resolve: {
        alias: {
        }
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, 'static/src'),
                path.resolve(__dirname, 'view')
            ],
            exclude: [
                nodeModulesPath
            ],
            loader: 'babel-loader!eslint'
        }, {
            test: /\.less$/,
            include: [
                path.resolve(__dirname, 'static/src'),
            ],
            loader: 'style!css!parker?filename=./parker-reports/[name].md!csslint?failWarning=false&failOnError=false!postcss-loader!less'
        }, {
            test: /\.(png|jpg)$/,
            include: [
                path.resolve(__dirname, 'static/src'),
            ],
            loader: 'url?limit=1000'
        }]
    },
    entry: {
        lottery: ['./static/src/lottery.js'],
        vendors: ['babel-polyfill', 'react', 'react-dom', 'events', 'keymirror', 'classnames']
    },
    output: {
        path: path.resolve(__dirname, 'static/dist/'),
        filename: '[name].js',
        publicPath: "/"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', '[name].js')
    ],
    postcss: function () {
        return [autoprefixer({browsers: ['Android >= 4', 'iOS >= 7', 'last 2 ChromeAndroid versions']})];
    },
    csslint: {
        failWarning: false,
        failOnError: false
    }
};
