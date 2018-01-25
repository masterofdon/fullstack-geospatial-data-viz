// NOTE: To use this example standalone (e.g. outside of deck.gl repo)
// delete the local development overrides at the bottom of this file

// avoid destructuring for older Node version support
const path = require('path');
const resolve = path.resolve;
const webpack = require('webpack');

const CONFIG = {
  entry: './index.js',
  devtool: 'source-map',
  target: "node",
  // output: {
  //   path: resolve(__dirname, "./"),
  //   publicPath: "https://localhost:3030",
  //   filename: "bundle.js"
  // },
  devServer: { 
    contentBase: ['./'], 
    publicPath: '/', 
    historyApiFallback: true, 
    hot: true, 
    inline: true, 
    port: 3002
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-2']
      }
    }]
  },
  resolve: {
    alias: {
      // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
      'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },

  // Optional: Enables reading mapbox token from environment variable
  plugins: [
    new webpack.EnvironmentPlugin(['MapboxAccessToken'])
  ]
};

// This line enables bundling against src in this repo rather than installed deck.gl module
module.exports = CONFIG;