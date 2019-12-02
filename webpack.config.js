const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './test/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  resolve: {
    modules: [
      'test',
      'src',
      'node_modules'
    ]
  },

  mode: 'development',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './test/index.html',
      minify: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  optimization: {
    namedModules: true,
    noEmitOnErrors: true
  },

  target: 'web',

  devtool: 'cheap-module-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 8800,
    historyApiFallback: true,
    hot: true
  }
};
