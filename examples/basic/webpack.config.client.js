const path = require('path');

const WebpackServeUrl = 'http://localhost:3002';

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['@babel/polyfill', './src/client/index'],
  output: {
    path: path.resolve('dist'),
    publicPath: `${WebpackServeUrl}/dist/`, // MUST BE FULL PATH!
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve('src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'dist/',
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[folder]--[name]--[local]--[hash:base64:2]',
            },
          }
        ]
      },
    ],
  },
};