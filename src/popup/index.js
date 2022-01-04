import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

import './main.scss'
import '~/locales'

import configurationStore, { history, popupInitailState } from '~/store'

import App from './boot/App'

const store = configurationStore(popupInitailState)
window.store = store

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
