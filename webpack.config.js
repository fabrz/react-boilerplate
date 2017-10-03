const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');

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
        test: /\.scss$/,
        include: path.join(__dirname, 'assets/react'),
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss-loader',
          'sass-loader',
        ],
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
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer'),
        ],
        context: __dirname,
        output: { path: './' },
      },
    }),
  ],
  watchOptions: {
    poll: true,
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
  ]);
} else {
  const StyleLintPlugin = require('stylelint-webpack-plugin');
  module.exports.plugins = module.exports.plugins.concat([
    new StyleLintPlugin({
      files: ['**/*.s?(a|c)ss'],
      syntax: 'scss',
    }),
  ]);
}
