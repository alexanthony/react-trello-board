import { REHYDRATE } from 'redux-persist/constants'

import { actionTypes as ListActionTypes } from './lists'
import { isBlank } from '../utils'

export const actionTypes = {
  SET_CARD_TITLE: 'SET_CARD_TITLE'
}

const actionCreators = {
  setCardTitle: (cardId, newTitle) => ({
    type: actionTypes.SET_CARD_TITLE,
    cardId,
    newTitle: isBlank(newTitle) ? 'Card' : newTitle
  })
}

export const CardActions = actionCreators

const card = (state = {}, action) => {
  switch (action.type) {
    case ListActionTypes.ADD_CARD:
      return { id: action.id, title: action.title }
    case actionTypes.SET_CARD_TITLE:
      return { ...state, title: action.newTitle }
    default:
      return state
  }
}

export const reducer = (state = {}, action) => {
  let incoming
  switch (action.type) {
    case ListActionTypes.ADD_CARD:
      return { ...state, [action.id]: card(state[action.id], action) }
    case actionTypes.SET_CARD_TITLE:
      return { ...state, [action.cardId]: card(state[action.cardId], action) }
    case REHYDRATE:
      incoming = action.payload.cards
      if (incoming) return { ...state, ...incoming }
      return state
    default:
      return state
  }
}
