import { combineReducers } from 'redux'

import { connectRouter } from 'connected-react-router'

// customize store reducer
import skinReducer from './skin'

/**
 * 
 * @param {*} history 
 * @returns 
 */
const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    skinState: skinReducer,
  })

export default createRootReducer
