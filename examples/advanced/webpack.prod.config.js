const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: ['@babel/polyfill', './src/client/index'],
  output: {
    path: path.resolve('now/build'),
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
              publicPath: 'build/',
            }
          }
        ]
      }
    ],
  },
};