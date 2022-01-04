const open = require('open')
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const { distTarget } = require('./paths')
const devWebpackOptions = require('./webpack/webpack.dev')

const port = process.env.port || 7315

const getOpenBrowser = () => {
  let bsTarget = process.env['BS_TARGET'] || ''
  switch (bsTarget.toLowerCase()) {
    case 'chrome':
      return {
        target: ['/popup'],
        app: open.apps.chrome,
      }
    case 'firefox':
    case 'fox':
      return {
        target: ['/popup'],
        app: open.apps.firefox,
      }
    case 'edge':
      return {
        target: ['/popup'],
        app: open.apps.edge,
      }
    default:
      return false
  }
}

const devServerOptions = {
  static: {
    directory: distTarget,
  },
  historyApiFallback: {
    //https://github.com/bripkens/connect-history-api-fallback
    index: 'popup.html',
    rewrites: [{ from: /\/popup/, to: '/popup.html' }],
  },
  open: getOpenBrowser(),
  compress: true,
  hot: true,
  port: port,
  proxy: {},
  devMiddleware: {
    publicPath: `http://localhost:${port}/`,
    writeToDisk: true,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  // allowedHosts: ['xxx.com'], // all,auto,['']
}
const compiler = webpack(devWebpackOptions)
const server = new WebpackDevServer(devServerOptions, compiler)

/** Run */

const startServer = async () => {
  server.startCallback(() => {
    console.log('>>>>start server')
  })
}

startServer()
