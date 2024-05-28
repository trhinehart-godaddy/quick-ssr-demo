const path = require('node:path');

module.exports = {
  mode: 'production',
  entry: './src/client/index.js',
  output: {
    filename: 'client.js',
    path: path.resolve('./dist/webpack/client')
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /\/server\//
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'linaria/loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  }
}
