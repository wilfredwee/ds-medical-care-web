var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');


module.exports = {
  context: __dirname,
  entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './assets/js/index'
  ],

  output: {
      path: path.resolve('./assets/bundles/'),
      filename: "[name]-[hash].js",
      publicPath: 'http://localhost:3000/assets/bundles/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    loaders: [
      // we pass the output from babel loader to react-hot loader
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'], },
      { test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" },
      { test: /\.css$/,    loader: "style-loader!css-loader" }
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}
