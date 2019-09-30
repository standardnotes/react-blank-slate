const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  devtool: 'cheap-source-map',
  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    hot: true,
  },
  entry: [
    path.resolve(__dirname, 'app/main.js'),
    path.resolve(__dirname, 'app/stylesheets/main.scss'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: './dist.js'
  },
  module: {
    rules: [
      { test: /\.css$/, include: path.resolve(__dirname, 'app'), loader: 'style-loader!css-loader' },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [ // Replaces ExtractTextPlugin, which is deprecated
          'style-loader',
          'css-loader',
          { loader: 'sass-loader', query: { sourceMap: false } },
        ],
      },
      { test: /\.js[x]?$/, include: [
        path.resolve(__dirname, 'app'),
        path.resolve(__dirname, 'node_modules/sn-components-api/dist/dist.js')
      ], exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    minimize: true, // Replaces uglifyJsPlugin
    splitChunks: { // Replaces ExtractTextPlugin.allChunks
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './dist.css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' },
    ])
  ]
};
