var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'src/public');
var STATIC_DIR = path.resolve('../backend/static/backend/')
var APP_DIR = path.resolve(__dirname, 'src/app');

var apiHost;

var setupApi = function() {
  switch (process.env.NODE_ENV) {
    case 'production':
      apiHost = '"http://theassignmintzapp.herokuapp.com"';
      break;
    case 'qa':
    case 'develop':
    default:
      apiHost = '"http://localhost:8000"';
      break;
  }
};

setupApi();

var config = {
   entry: APP_DIR + '/index.js',

   output: {
      path: BUILD_DIR,
      filename: 'transformed.js',
   },

   devServer: {
      inline: true,
      port: 8080
   },

   module: {
      loaders: [
         {
            test: /\.(js|jsx)$/,
            include: APP_DIR,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.css$/,
            loader: 'style-loader'
         },
         {
            test: /\.css$/,
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
         },
         {
             test: /\.(jpg|png|gif|svg|pdf|ico)$/,
             use: [
                 {
                     loader: 'file-loader',
                     options: {
                         name: '[path][name]-[hash:8].[ext]'
                     },
                 },
             ]
         }
      ]
   },
   plugins : [
     new webpack.DefinePlugin({
       __API__:apiHost
     })
   ]
}

module.exports = config;
