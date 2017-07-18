import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'

import rootReducer from '../redux'

const middleware = []

const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
    autoRehydrate()
  )

  // begin periodically persisting the store
  persistStore(store, { blacklist: ['ui', 'edit'] })

  return store
}

export default configureStore
