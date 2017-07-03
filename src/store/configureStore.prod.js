import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { persistStore, autoRehydrate } from 'redux-persist'

import rootReducer from '../redux'

const reduxRouterMiddleware = routerMiddleware(browserHistory)
const middleware = [reduxRouterMiddleware, thunk].filter(Boolean)

const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
    autoRehydrate()
  )

  // begin periodically persisting the store
  persistStore(store)

  return store
}

export default configureStore
