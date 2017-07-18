/* eslint-disable react/jsx-first-prop-new-line */
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import logger from 'redux-logger'

import rootReducer from '../redux'

const middleware = [logger].filter(Boolean)

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
    module.hot.accept('../redux', () => {
      /* eslint-disable global-require */
      const nextReducer = require('../redux').default
      /* eslint-enable global-require */
      store.replaceReducer(nextReducer)
    })
  }

  // begin periodically persisting the store
  persistStore(store, { blacklist: ['ui', 'edit'] })

  return store
}

export default configureStore
