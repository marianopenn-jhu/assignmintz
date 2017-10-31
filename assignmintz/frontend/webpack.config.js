var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/Index.html',
  filename: 'Index.html',
  inject: 'body'
})

var config = {
   entry: __dirname + '/app/index.js',

   output: {
      path:__dirname + '/build/',
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8080
   },

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   },

   plugins: [
        HTMLWebpackPluginConfig
    ]
}

module.exports = config;
