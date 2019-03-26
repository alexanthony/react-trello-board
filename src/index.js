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
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html {
  position: relative;
  height: 100%;
}

body {
  font: 14px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  line-height: 18px;
  color: #4d4d4d;
  font-weight: normal;
  padding: 0 10px;
  background-color: #0079bf;
  position: relative;
  height: 100%;
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
}

textarea {
  font-family: inherit;
}

main {
  white-space: nowrap;
  height: 100%;
  display: flex;
  flex-direction: column;
}

pre {
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 5px;
}

pre code {
  background: none;
  padding: 0;
  border-radius: 0;
}

blockquote {
  border-left: 5px solid rgba(255, 255, 255, 0.5);
  margin: 1.5em 10px;
  padding: 0.5em 10px;
}

hr {
  border-top: 5px solid rgba(255, 255, 255, 0.5);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin-top: 1rem;
  box-sizing: content-box;
  height: 0;
}

code {
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 5px;
}

.swatch {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 3px #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
}

button.swatch-button {
  height: 30px;
  margin-left: 5px;
}

.list-menu-button {
  position: absolute;
  top: 4px;
  right: 4px;
}
`

const { store, persistor } = configureStore()

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <Base>
        <Board />
      </Base>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
)
