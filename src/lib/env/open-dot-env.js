/* eslint-disable no-undef */

export const storeLogged = process.env.STORE_LOGGED === 'on'
export const appTitle = process.env.APP_TITLE || 'QuickDev Tools'
export const appName = process.env.APP_NAME || 'QuickDev Tools'
export const commitHash = __APP_VERSION__
export const appVersion = __APP_VERSION__

const appBase = {
  appName,
  appTitle,
  version: `${appVersion}-${commitHash}`,
}

window.appBase = appBase

export default appBase
