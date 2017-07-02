import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { createSelector } from 'reselect'

import lists from './lists'
import { reducer as edit } from './edit'

const rootReducer = combineReducers({
  routing: routerReducer,
  lists,
  edit
})

export default rootReducer

const selectedCardIdSelector = state => state.edit.editCard

const listsSelector = state => state.lists.lists

export const selectedCardSelector = createSelector(
  selectedCardIdSelector,
  listsSelector,
  (selectedCardId, cardLists) => {
    if (!selectedCardId) {
      return {}
    }
    for (let i = 0; i < cardLists.length; i++) {
      const card = cardLists[i].cards.find(a => a.id === selectedCardId)
      if (card) {
        return card
      }
    }
    return {}
  }
)

export const selectedCardListSelector = createSelector(
  selectedCardIdSelector,
  listsSelector,
  (selectedCardId, cardLists) => {
    if (!selectedCardId) {
      return {}
    }
    for (let i = 0; i < cardLists.length; i++) {
      const card = cardLists[i].cards.find(a => a.id === selectedCardId)
      if (card) {
        return cardLists[i]
      }
    }
    return {}
  }
)
