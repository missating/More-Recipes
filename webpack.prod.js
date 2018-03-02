const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const uglify = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new uglify({
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
});
