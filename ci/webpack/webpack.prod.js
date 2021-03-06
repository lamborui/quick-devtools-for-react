/*!
 * FilePath     : webpack.prod.js
 * 2019-10-15 16:43:13
 * Description  : Extension devtools v0.1.0
 * 		 This file is implement
 *
 * Copyright 2019-2021 Lamborui
 *
 */
// make sure this code at top
const NODE_ENV_VALT = 'production'
process.env.BABEL_ENV = NODE_ENV_VALT
process.env.NODE_ENV = NODE_ENV_VALT

const { merge } = require('webpack-merge')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')

const commonConfig = require('./webpack.common')

const prodConfig = merge(commonConfig, {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
      chunkFilename: '[id].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.analyzerMode || 'disabled',
    }),
    new CompressionPlugin({
      test: new RegExp('\\.(js|css|jpg|png)$'), // 其他媒体mov文件一般是经过压缩后的
      algorithm: 'gzip',
      threshold: 10240, // 只处理10k以上的文件
      minRatio: 0.8, //只有压缩后与原值比率小于0.8 才处理
    }),
  ],
})

// console.log(JSON.stringify(prodConfig, null, 2));
module.exports = prodConfig
