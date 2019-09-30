const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.js');

module.exports = merge.smart(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    rules: [
      { test: /\.js[x]?$/, include: [
        path.resolve(__dirname, 'node_modules/sortablejs/Sortable.min.js'),
      ], exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
});
