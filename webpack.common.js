// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');


// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'build'),
  SRC: path.resolve(__dirname, 'client/src'), // source folder path
  JS: path.resolve(__dirname, 'client/src/js'),
};

// Webpack configuration
module.exports = {
  entry: [
    path.join(paths.JS, 'index.js')
  ],
  output: {
    path: paths.DIST,
    filename: 'bundle.js',
    publicPath: '/'
  },

  // Tell webpack to use html plugin
  // index.html is used as a template in which it'll inject bundled app.
  plugins: [
    // CSS will be extracted to this bundle file
    new ExtractTextPlugin('style.bundle.css'),
    new cleanWebpackPlugin(['build'])
  ],
  // Loaders configuration
  // We are telling webpack to use "babel-loader" for .js and .jsx files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      // CSS loader to CSS files -> ADDED IN THIS STEP
      // Files will get handled by css loader and then passed to the extract text plugin
      // which will write it to the file we defined above
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
      // File loader for image assets
      // We'll add only image extensions, but you can things like svgs, fonts and videos
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  // Enable importing JS files without specifying their's extenstion
  //
  // So we can write:
  // import MyComponent from './my-component';
  //
  // Instead of:
  // import MyComponent from './my-component.jsx';
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
