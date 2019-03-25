const path = require('path')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BROWSER': true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(jpg|jpeg|gif|png|ico|ttf|otf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=[path][name].[ext]',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3002,
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
}
