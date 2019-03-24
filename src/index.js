/* eslint-disable global-require */
require('@babel/polyfill')
/* eslint-enable global-require */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'

import './assets/temp.css'

import configureStore from './store/configureStore'
import Base from './containers/Base/Base'
import Board from './containers/Board/Board'
import { PersistGate } from 'redux-persist/integration/react'

const {store, persistor} = configureStore()

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Base>
      <Board />
    </Base>
  </PersistGate>
  </Provider>,
  document.getElementById('app')
)
