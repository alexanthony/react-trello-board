import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { createSelector } from 'reselect'

import lists from './lists'
import { reducer as edit } from './edit'
import { reducer as cards } from './cards'

const rootReducer = combineReducers({
  routing: routerReducer,
  lists,
  edit,
  cards
})

export default rootReducer

const selectedCardIdSelector = state => state.edit.editCard

const listsSelector = state => state.lists.lists
const cardsSelector = state => state.cards

// export const selectedCardSelector = createSelector(
//   selectedCardIdSelector,
//   listsSelector,
//   (selectedCardId, cardLists) => {
//     if (!selectedCardId) {
//       return {}
//     }
//     for (let i = 0; i < cardLists.length; i++) {
//       const card = cardLists[i].cards.find(a => a.id === selectedCardId)
//       if (card) {
//         return card
//       }
//     }
//     return {}
//   }
// )

export const selectedCardSelector = createSelector(
  selectedCardIdSelector,
  cardsSelector,
  (selectedCardId, cardsById) => {
    if (!selectedCardId) {
      return {}
    }
    return cardsById[selectedCardId]
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

export const cardsByListSelector = createSelector(
  listsSelector,
  cardsSelector,
  (ls, cs) => {
    const result = {}
    ls.forEach(l => {
      result[l.id] = l.cards.map(c => cs[c])
    })
    return result
  }
)
