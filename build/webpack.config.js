/**
 * Created by my on 17/2/21.
 */

'use strict';
// this is a  flag
// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var default_entries = {
    vendor:'./src/libs/index.js',
    app: './src/index/index.js'
};

var entries = /* @echo webpack.entries */

    Object.assign(default_entries, entries);

function getIp() {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var temp = {};

    for (var dev in ifaces) {

        var alias = 0;
        ifaces[dev].forEach(function (details) {
            if (details.family == 'IPv4') {
                console.log(dev + (alias ? ':' + alias : ''), details.address);
                temp[dev + (alias ? ':' + alias : '')] = details.address;
                ++alias;
            }
        });
    }

    // return 'localhost';
    return temp['en0'] || 'localhost';

}

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig () {
    var config = {};
    config.entry = default_entries,
    config.output = isTest ? {} : {
            path: __dirname + '/dist',
            // publicPath: isProd ? '/' : 'http://'+ getIp()+':9000/',
            publicPath: isProd ? '/' : 'http://localhost:8080/',
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js'
        };

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */

    // Initialize module
    config.module = {
        preLoaders: [],
        loaders: [{
            test: /\.js$/,
            loaders: ['ng-annotate?add=true&remove=false','babel'],
            exclude: /node_modules/
        }, {
            test: /\.(css|less)$/,
            loader: isTest ? 'style!less!css' : ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!less-loader')
        },{
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=50000&name=[path][name].[ext]'
        },
            //   {
            // test: /\.(jpg|png)$/,
            // loader: "url?limit=8192"},
            {
                test: /\.html$/,
                loader: 'raw'
            }]
    };

    if (isTest) {
        config.module.preLoaders.push({
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'istanbul-instrumenter',
            query: {
                esModules: true
            }
        })
    }


    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        })
    ];

    // Skip rendering index.html in test mode
    if (!isTest) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './src/index/index.html',
                inject: 'body',
                chunks:['app', 'vendor']
            }),
            new ExtractTextPlugin('[name].[hash].css', {disable: !isProd})
        )
    }
    if (isProd) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            // new webpack.optimize.UglifyJsPlugin(),
            new CopyWebpackPlugin([{
                from: __dirname + '/src/index/index.html'
            }])
        )
    }

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './src/index',
        stats: 'minimal'
    };

    return config;
}();