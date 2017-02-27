var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var APP_DIR = path.resolve('/path/to/your/app/root');
var BUILD_PATH = path.resolve('/path/to/your/wwwroot');

//This was done with asp.net MVC in mind so we have a view folder, 
//but these can be modified out easily and just set the build path to wwwroot so that will contain index.html and bundle.js.
//Just remove APP_VIEW_PATH and VIEW_TEMPLATE_PATH variables and modify htmlWebpackPlugin to suit your needs.
var APP_VIEW_PATH = path.resolve('/path/to/your/view/folder');
var VIEW_TEMPLATE_PATH = path.resolve('/path/to/your/template.cshtml');

var nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv !== 'development' && nodeEnv !== 'production') {
    throw 'Invalid NODE_ENV. Valid values are "development" and "production".'
}

var devEnv = nodeEnv === 'development';

module.exports = {
    entry: APP_DIR + '/app.tsx',
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js',
        publicPath: ''
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_PROD_ENV : devEnv ? false:true,
            //modify API_URL to suit your project
            API_URL: devEnv ? '"http://localhost:5000/api/"' : '"/api/"'
        }),

        new webpack.ProvidePlugin({
            _:'lodash'
        }),

        new htmlWebpackPlugin({
            filename: APP_VIEW_PATH + '/Index.cshtml',
            template: VIEW_TEMPLATE_PATH,
            inject:'body',
            hash: true
        }),
        new ExtractTextPlugin( "bundle.css" )
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre'},
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
}
