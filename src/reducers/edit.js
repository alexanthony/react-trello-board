import { combineReducers } from 'redux'

const actionTypes = {
  SET_EDIT_CARD: 'SET_EDIT_CARD',
  DISMISS_EDIT_CARD: 'DISMISS_EDIT_CARD'
}

const actionCreators = {
  setEditCard: cardId => ({ type: actionTypes.SET_EDIT_CARD, cardId }),
  dismissEditCard: () => ({ type: actionTypes.DISMISS_EDIT_CARD })
}

export const EditActions = actionCreators

const editCard = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_EDIT_CARD:
      return action.cardId
    case actionTypes.DISMISS_EDIT_CARD:
      return null
    default:
      return state
  }
}

export const reducer = combineReducers({ editCard })
