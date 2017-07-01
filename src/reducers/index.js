import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import lists from './lists'
import { reducer as edit } from './edit'

const rootReducer = combineReducers({
  routing: routerReducer,
  lists,
  edit
})

export default rootReducer
