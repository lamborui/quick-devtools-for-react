/****************************
 * FilePath: webpack.common.js
 * 2019-12-15 13:34:54
 * Description:
 * 		 This file is the webpack conifg options
 * Copyright 2019-2021 Lamborui, All Rights Reserved.
 *
 */
const chalk = require('chalk')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

// extract css to files
const autoprefixer = require('autoprefixer')

const { R, src, distTarget, pubDir } = require('../paths')
const {
  Entries,
  htmlPlugins,
  ResolveAlias,
  ResolveExtensions,
} = require('./webpack-helper')

const { EjectPlugins } = require('./eject-env-plugins')
const { ManifestTransformPlugins } = require('./manifest-transform')

// console.log(
//   '>>>>>>>>>>>>>>>>Entries>>>>>>>>>>>>>',
//   JSON.stringify(Entries, null, 2)
// );

const devMode = process.env.NODE_ENV === 'development'

const JSParseRule = devMode
  ? {
      test: /\.(js)x?$/,
      exclude: /node_modules/,
      use: [
        {
          // hot refresh
          // see: https://github.com/facebook/react/issues/16604#issuecomment-528663101
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      ],
    }
  : {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }

const PrevousPlugins = [
  ...EjectPlugins,
  // 进度条
  new ProgressBarPlugin({
    format: `:msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
  }),
  // Removes/cleans build folders and unused assets when rebuilding
  new CleanWebpackPlugin({
    dry: !devMode,
    verbose: !devMode,
  }),
].concat(ManifestTransformPlugins)

const SuffixPlugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: R(src, 'icons'),
        to: R(distTarget, 'icons'),
        force: true,
      },
      {
        from: R(pubDir, 'js'),
        to: R(distTarget, 'js'),
        force: true,
      },
      // {
      //   from: R(src, 'manifest.json'),
      //   to: R(distTarget, 'manifest.json'),
      //   force: true,
      //   toType: 'file',
      //   transform: (content, absoluteFrom) => {
      //     // console.log(
      //     //   '>>>>>>>>>****************',
      //     //   absoluteFrom,
      //     //   content.toString()
      //     // )
      //     return content
      //   },
      // },
    ],
  }),
]

const plugins = []
  .concat(PrevousPlugins)
  .concat(htmlPlugins)
  .concat(SuffixPlugins)

const webpackBase = {
  entry: {
    ...Entries,
  },
  output: {
    path: distTarget,
    filename: (pathData) => {
      return pathData.chunk.name === 'background'
        ? '[name].bundle.js'
        : 'js/[name].bundle.js'
    },
    clean: true,
    publicPath: process.env.ASSET_PATH || '/',
    assetModuleFilename: devMode
      ? 'images/[hash][ext][query]'
      : 'images/[name][ext]',
  },
  resolve: {
    alias: ResolveAlias,
    extensions: ResolveExtensions,
  },
  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      JSParseRule,
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(css|scss|sass)$/,
        use: [
          // execute sort :down---> up
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true, debug: true },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
          {
            // postcss loader help for
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [autoprefixer],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' },
    ],
  },
  plugins: plugins.filter(Boolean),
  stats: {
    errorDetails: true,
  },
}

module.exports = webpackBase
