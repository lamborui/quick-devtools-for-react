/*!
 * FilePath     : index.js
 * 2020-10-15 09:08:22
 * Description  : Extension devtools v0.1.0
 * 		 This file is implement
 *
 * Copyright 2019-2021 Lamborui
 *
 */
const chalk = require('chalk')
const fs = require('fs-extra')
const DotenvWebpack = require('dotenv-webpack')
const envSuffix = process.env.NODE_ENV || 'development'
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', process.env.NODE_ENV)
const dotenvWebpackPlugin = new DotenvWebpack({
  path: `./config/.env.${envSuffix}`,
  defaults: './config/.env',
  safe: false, // If true ,will verify the '.env' variables are all set
  allowEmptyValues: true,
  systemvars: false,
})

PrintEnv()

function PrintEnv() {
  const envVars = dotenvWebpackPlugin.gatherVariables()
  console.log(
    chalk.redBright(`Current env variables:\n`) +
      chalk.magentaBright(JSON.stringify(envVars, null, 2))
  )
}

module.exports.dotenvWebpackPlugin = dotenvWebpackPlugin
module.exports.getAppEnvVars = () => dotenvWebpackPlugin.gatherVariables()

module.exports.AppTitle =
  dotenvWebpackPlugin.gatherVariables()['APP_TITLE'] || ''
