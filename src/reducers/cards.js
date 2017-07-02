import { REHYDRATE } from 'redux-persist/constants'

import { ADD_CARD, SET_CARD_TITLE } from '../actions/lists'

const card = (state = {}, action) => {
  switch (action.type) {
    case ADD_CARD:
      return { id: action.id, title: action.title }
    case SET_CARD_TITLE:
      return { ...state, title: action.newTitle }
    default:
      return state
  }
}

export const reducer = (state = {}, action) => {
  let incoming
  switch (action.type) {
    case ADD_CARD:
      return { ...state, [action.id]: card(state[action.id], action) }
    case SET_CARD_TITLE:
      return { ...state, [action.cardId]: card(state[action.cardId], action) }
    case REHYDRATE:
      incoming = action.payload.cards
      if (incoming) return { ...state, ...incoming.cards }
      return state
    default:
      return state
  }
}
