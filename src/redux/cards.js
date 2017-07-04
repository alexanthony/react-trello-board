import { REHYDRATE } from 'redux-persist/constants'

import { actionTypes as ListActionTypes } from './lists'
import { isBlank } from '../utils'

export const actionTypes = {
  SET_CARD_TITLE: 'SET_CARD_TITLE',
  SET_CARD_DESCRIPTION: 'SET_CARD_DESCRIPTION'
}

const actionCreators = {
  setCardTitle: (cardId, newTitle) => ({
    type: actionTypes.SET_CARD_TITLE,
    cardId,
    newTitle: isBlank(newTitle) ? 'Card' : newTitle
  }),
  setCardDescription: (cardId, newDescription) => ({
    type: actionTypes.SET_CARD_DESCRIPTION,
    cardId,
    newDescription: isBlank(newDescription)
      ? 'Click to edit description...'
      : newDescription
  })
}

export const CardActions = actionCreators

const card = (state = {}, action) => {
  switch (action.type) {
    case ListActionTypes.ADD_CARD:
      return {
        id: action.id,
        title: action.title,
        description: 'Click to edit description...'
      }
    case actionTypes.SET_CARD_TITLE:
      return { ...state, title: action.newTitle }
    case actionTypes.SET_CARD_DESCRIPTION:
      return { ...state, description: action.newDescription }
    default:
      return state
  }
}

export const reducer = (state = {}, action) => {
  let incoming
  let newState
  switch (action.type) {
    case ListActionTypes.ADD_CARD:
      return { ...state, [action.id]: card(state[action.id], action) }
    case actionTypes.SET_CARD_TITLE:
    case actionTypes.SET_CARD_DESCRIPTION:
      return { ...state, [action.cardId]: card(state[action.cardId], action) }
    case ListActionTypes.DELETE_CARD:
      newState = { ...state }
      delete newState[action.cardId]
      return newState
    case REHYDRATE:
      incoming = action.payload.cards
      if (incoming) return { ...state, ...incoming }
      return state
    default:
      return state
  }
}
