const path = require('node:path');

module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve('./dist/webpack')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
