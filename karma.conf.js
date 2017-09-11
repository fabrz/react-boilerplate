const path = require('path');
const webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
webpackConfig.externals = {
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
};
webpackConfig.module.loaders = [
  { test: /\.js$/, include: path.join(__dirname, 'assets/react'), loaders: ['babel?cacheDirectory'] },
  { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file' },
  { test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000' },
  { test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream' },
  { test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml' },
  { test: /\.(jpe?g|png|gif)$/i, loaders: ['file'] },
  { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
  { test: /\.json$/, loader: 'json' },
  {
    test: /\.scss$/,
    include: path.join(__dirname, 'assets/react'),
    loaders: [
      'style',
      'css?modules&importLoaders=1&localIdentName=[local]',
      'postcss',
      'sass',
    ],
  },
];

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'assets/react/**/*.spec.js',
    ],

    preprocessors: {
      // add webpack as preprocessor
      'assets/react/**/*.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true, // please don't spam the console when running in karma!
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
  });
};
