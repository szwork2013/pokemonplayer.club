const path = require('path'),
    webpack = require('webpack');

const config = require('./config');

const hostAddress = 'http://' + config.SERVER_IP + ':' + config.SERVER_PORT;

const PRODUCTION = 'production';
const DEVELOPMENT = 'development';

var webpackConfig = {
    entry: (function () {

        if (process.env.NODE_ENV === PRODUCTION) {
            return {
                app: './src/App.js'
            }
        } else {
            return {
                app: [
                    'webpack-hot-middleware/client?path=' + devHost + '/__webpack_hmr',
                    './src/App.js'
                ]
            }
        }
    })(),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: (function () {
            if (process.env.NODE_ENV === PRODUCTION) {
                return './dist/';
            } else {
                return hostAddress + '/dist/';
            }
        })()
    },
    module: {
        loaders: [{
            test: /\.(css|scss)$/,
            exclude: /node_modules/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            exclude: /node_modules/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }, {
            test: /\.(png|jpg|gif|icon|ico)$/,
            exclude: /node_modules/,
            loader: 'url-loader?limit=16384&name=images/[hash].[ext]'
        }, {
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            loaders: ['babel']
        }]
    }, plugins: (function () {

        var definePluginObj = {
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV === PRODUCTION ? PRODUCTION : DEVELOPMENT),
                'VERSION': JSON.stringify(config.VERSION)
            }
        };

        if (process.env.NODE_ENV === PRODUCTION) {
            return [
                new webpack.DefinePlugin(definePluginObj),
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.OccurrenceOrderPlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    output: {
                        comments: false
                    },
                    compressor: {
                        sequences: false,     // join consecutive statemets with the “comma operator”
                        properties: false,    // optimize property access: a['foo'] → a.foo
                        dead_code: false,     // discard unreachable code
                        drop_debugger: true,  // discard “debugger” statements
                        unsafe: false,        // some unsafe optimizations (see below)
                        conditionals: true,   // optimize if-s and conditional expressions
                        comparisons: true,    // optimize comparisons
                        evaluate: false,      // evaluate constant expressions
                        booleans: true,       // optimize boolean expressions
                        loops: true,          // optimize loops
                        unused: true,         // drop unused variables/functions
                        hoist_funs: true,     // hoist function declarations
                        hoist_vars: true,     // hoist variable declarations
                        if_return: true,      // optimize if-s followed by return/continue
                        join_vars: true,      // join var declarations
                        cascade: false,       // try to cascade `right` into `left` in sequences
                        side_effects: false,  // drop side-effect-free statements
                        warnings: true,       // warn about potentially dangerous optimizations/code
                        global_defs: {}       // global definitions
                    }
                })
            ]
        } else {
            return [
                new webpack.DefinePlugin(definePluginObj),
                new webpack.HotModuleReplacementPlugin()
            ]
        }
    })()
};

module.exports = webpackConfig;
