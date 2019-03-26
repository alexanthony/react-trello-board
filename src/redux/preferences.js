import { combineReducers } from 'redux'

const actionTypes = {
  CLEAR_BACKGROUND_IMAGE: 'CLEAR_BACKGROUND_IMAGE',
  SET_BACKGROUND_IMAGE: 'SET_BACKGROUND_IMAGE',
  SET_BOARD_TITLE: 'SET_BOARD_TITLE',
}

const actionCreators = {
  setBackgroundImage: image => ({
    type: actionTypes.SET_BACKGROUND_IMAGE,
    image,
  }),
  clearBackgroundImage: () => ({ type: actionTypes.CLEAR_BACKGROUND_IMAGE }),
  setBoardTitle: title => ({ type: actionTypes.SET_BOARD_TITLE, title }),
}

export const PreferencesActions = actionCreators

const image = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_BACKGROUND_IMAGE:
      return action.image
    case actionTypes.CLEAR_BACKGROUND_IMAGE:
      return null
    default:
      return state
  }
}

const background = combineReducers({ image })

const boardTitle = (state = "Alex's Trello Clone", action) => {
  switch (action.type) {
    case actionTypes.SET_BOARD_TITLE:
      return action.title
    default:
      return state
  }
}

export const reducer = combineReducers({ background, boardTitle })
