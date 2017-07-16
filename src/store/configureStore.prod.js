import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { persistStore, autoRehydrate } from 'redux-persist'

import rootReducer from '../redux'

const reduxRouterMiddleware = routerMiddleware(browserHistory)
const middleware = [reduxRouterMiddleware].filter(Boolean)

const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
    autoRehydrate()
  )

  // begin periodically persisting the store
  persistStore(store, { blacklist: ['routing', 'ui', 'edit'] })

  return store
}

export default configureStore
