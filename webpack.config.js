const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './assets/react/app.js'],
  output: {
    path: `${__dirname}/public/_js`,
    filename: 'bundle.js',
    publicPath: './public/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]',
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.join(__dirname, 'assets/css/screen.scss'),
                ],
              },
            },
          ],
        }),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: path.join(__dirname, 'assets/img/root'),
        loader: 'file-loader',
        options: {
          name: '_img/[name].[ext]?[hash]',
          publicPath: '/',
          outputPath: '../',
        },
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        include: path.join(__dirname, 'assets/img/root'),
        loader: 'file-loader',
        options: {
          name: '_img/[name].[ext]?[hash]',
          publicPath: '/',
          outputPath: '../',
        },
      },
      {
        test: /\.(woff2?|ttf|eot|otf)$/,
        loader: 'url-loader',
        options: {
          name: '_fonts/[name].[ext]?[hash]',
          limit: 10000,
          publicPath: '/',
        },
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
        options: {
          name: '_img/svg/[name].[ext]?[hash]',
          publicPath: '/',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('../_css/screen.css', {
      allChunks: true,
    }),
    new StyleLintPlugin({
      files: ['**/*.s?(a|c)ss'],
      syntax: 'scss',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer'),
        ],
        context: __dirname,
        output: { path: './' },
      },
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false,
    //     drop_console: true,
    //   },
    // }),
  ],
  watchOptions: {
    poll: true,
  },
};
