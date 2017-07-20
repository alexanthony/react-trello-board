import { combineReducers } from 'redux'
import { REHYDRATE } from 'redux-persist/constants'

const actionTypes = {
  CLEAR_BACKGROUND_IMAGE: 'CLEAR_BACKGROUND_IMAGE',
  SET_BACKGROUND_IMAGE: 'SET_BACKGROUND_IMAGE',
  SET_BOARD_TITLE: 'SET_BOARD_TITLE'
}

const actionCreators = {
  setBackgroundImage: image => ({
    type: actionTypes.SET_BACKGROUND_IMAGE,
    image
  }),
  clearBackgroundImage: () => ({ type: actionTypes.CLEAR_BACKGROUND_IMAGE }),
  setBoardTitle: title => ({ type: actionTypes.SET_BOARD_TITLE, title })
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

const boardTitle = (state = "Alex's Trello Clone", action) => {
  switch (action.type) {
    case actionTypes.SET_BOARD_TITLE:
      return action.title
    case REHYDRATE:
      if (action.payload.preferences && action.payload.preferences.boardTitle) {
        return action.payload.preferences.boardTitle
      }
      return state
    default:
      return state
  }
}

export const reducer = combineReducers({ background, boardTitle })
