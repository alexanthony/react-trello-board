import { combineReducers } from 'redux'
import { REHYDRATE } from 'redux-persist/constants'

const actionTypes = {
  CLEAR_BACKGROUND_IMAGE: 'CLEAR_BACKGROUND_IMAGE',
  SET_BACKGROUND_IMAGE: 'SET_BACKGROUND_IMAGE'
}

const actionCreators = {
  setBackgroundImage: image => ({
    type: actionTypes.SET_BACKGROUND_IMAGE,
    image
  }),
  clearBackgroundImage: () => ({ type: actionTypes.CLEAR_BACKGROUND_IMAGE })
}

export const PreferencesActions = actionCreators

const image = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_BACKGROUND_IMAGE:
      return action.image
    case actionTypes.CLEAR_BACKGROUND_IMAGE:
      return null
    case REHYDRATE:
      if (
        action.payload.preferences &&
        action.payload.preferences.background &&
        action.payload.preferences.background.image
      ) {
        return action.payload.preferences.background.image
      }
      return state
    default:
      return state
  }
}

const background = combineReducers({ image })

export const reducer = combineReducers({ background })
