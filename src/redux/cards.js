import { REHYDRATE } from 'redux-persist/constants'

import { actionTypes } from './lists'

const card = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_CARD:
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
    case actionTypes.ADD_CARD:
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
