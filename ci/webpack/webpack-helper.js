/****************************
 * FilePath: webpack-helper.js
 * 2019-12-15 14:00:17
 * Description:
 *
 * Copyright 2019-2021 Lamborui, All Rights Reserved.
 *
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { R, src, LOGO } = require('../paths')
const { AppTitle } = require('../../config')

const BasePageRoot = ''
const JsExtensions = ['js', 'jsx', 'ts', 'tsx']
const ImgExtensions = ['png', 'jpg', 'jepg', 'gif']

const Entries = {
  background: R(src, BasePageRoot, 'background', 'index.js'),
  popup: R(src, BasePageRoot, 'popup', 'index.js'),
}

const ResolveAlias = {
  '~': src,
  '~Asset': R(src, 'asset'),
  '~Lib': R(src, 'lib'),
  '~UI': R(src, 'ui'),
  '~Scss': R(src, 'ui/scss'),
  '~Store': R(src, 'store'),
  '~Widget': R(src, 'widgets'),
  // '~View':R(src,'views'), // app
  '~Mock': R(src, 'mocks'),
  '~Page': R(src, 'pages'),
  '~P3View': R(src, 'popup/views'),
  '~P3Store': R(src, 'popup/store'),
}

const p3HtmWebpackPlugin = new HtmlWebpackPlugin({
  title: AppTitle || 'Lamborui',
  publicPath: '',
  favicon: LOGO,
  template: R(src, BasePageRoot, 'popup/popup.ejs'),
  filename: '[name].html',
  chunks: ['popup'],
  cache: false,
  excludeChunks: ['background'],
})

const htmlPlugins = [p3HtmWebpackPlugin]

module.exports = {
  BasePageRoot,
  Entries,
  htmlPlugins,
  ResolveAlias,
  ResolveExtensions: JsExtensions.concat(['css', 'scss', 'less'])
    .concat(ImgExtensions)
    .map((ext) => `.${ext}`),
  JsExtensions,
  ImgExtensions,
}
