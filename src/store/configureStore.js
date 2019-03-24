/* eslint-disable react/jsx-first-prop-new-line */
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from '../redux'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['ui', 'edit']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = initialState => {
  const store = createStore(
    persistedReducer,
    initialState,
      window.devToolsExtension ? window.devToolsExtension() : f => f,

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
  const persistor = persistStore(store)

  return {store, persistor}
}

export default configureStore
