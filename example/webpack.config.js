const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname,'./src/index.js'),
    vendor: ['react', 'react-dom']
  },

  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "target"),
    publicPath: "/"
  },

  node: {
    fs: "empty"
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },


  plugins: [

    // new webpack.optimize.CommonsChunkPlugin({
    //       name: 'commons',
    //       filename: 'commons.js',
    //       minChunks: 2,
    //     }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        "screw_ie8": true,
        "warnings": false,
        "unused": true,
        "dead_code": true,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),

    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
        inject: 'body',
      }),

    new CopyWebpackPlugin([{
        from: 'src/static', to: 'static' 
      }])
  ]
}
