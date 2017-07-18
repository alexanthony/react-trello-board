/* eslint-disable global-require */
require('babel-polyfill')
/* eslint-enable global-require */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'

import './assets/temp.styl'

import configureStore from './store/configureStore'
import Base from './containers/Base/Base'
import Board from './containers/Board/Board'

const store = configureStore()

render(
  <Provider store={store}>
    <Base>
      <Board />
    </Base>
  </Provider>,
  document.getElementById('app')
)
