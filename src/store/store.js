/*!
 * FilePath     : store.js
 * 2021-12-23 16:52:50
 * Description  : Refactor the react extension boilerplate
 * 		 This file is implement
 *
 * Copyright 2019-2021 Lamborui
 *
 */

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createHashHistory } from 'history'

import { storeLogged } from '~Lib/env/open-dot-env'

import createRootReducer from './reducers'

const loggerMiddleware = createLogger({ collapsed: true })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createBrowserHistory()

export default function configurationStore(preloadedState) {
  const middlewares = storeLogged
    ? [thunkMiddleware, loggerMiddleware, routerMiddleware(history)]
    : [thunkMiddleware, routerMiddleware(history)]

  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(...enhancers)
  )

  return store
}
