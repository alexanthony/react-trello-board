/* eslint-disable global-require */
require('babel-polyfill')
/* eslint-enable global-require */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import 'semantic-ui-css/semantic.min.css'

import { routes } from './routes'
import './assets/temp.styl'

import configureStore from './store/configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
