/* eslint-disable react/jsx-first-prop-new-line */
import { createStore, applyMiddleware, compose } from 'redux'
/* eslint-enable global-require, react/jsx-first-prop-new-line */
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { persistStore, autoRehydrate } from 'redux-persist'
import logger from 'redux-logger'

import rootReducer from '../reducers'

const reduxRouterMiddleware = routerMiddleware(browserHistory)
const middleware = [reduxRouterMiddleware, thunk, logger].filter(Boolean)

const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
      autoRehydrate()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /* eslint-disable global-require */
      const nextReducer = require('../reducers').default
      /* eslint-enable global-require */
      store.replaceReducer(nextReducer)
    })
  }

  // begin periodically persisting the store
  persistStore(store)

  return store
}

export default configureStore
