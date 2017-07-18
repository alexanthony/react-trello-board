import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import lists from './lists'
import { reducer as edit } from './edit'
import { reducer as cards } from './cards'
import { reducer as labelTypes } from './labelTypes'
import { reducer as ui } from './ui'
import { reducer as preferences } from './preferences'

const rootReducer = combineReducers({
  lists,
  edit,
  cards,
  labelTypes,
  ui,
  preferences
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
      const card = cardLists[i].cards.find(cardId => cardId === selectedCardId)
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
      result[l.id] = l.cards
        .map(c => cs[c])
        // This is defence against bad data
        // If a list has a reference to a card which doesn't exist
        // then don't include the card in the list
        .filter(c => c)
    })
    return result
  }
)

const labelTypesSelector = state => state.labelTypes

export const labelTypesArraySelector = createSelector(
  labelTypesSelector,
  types => Object.values(types)
)

export const labelsByCardSelector = createSelector(
  labelTypesSelector,
  cardsSelector,
  (lt, cs) => {
    const result = {}
    Object.values(cs).forEach(c => {
      result[c.id] = c.labels.map(l => lt[l])
    })
    return result
  }
)

export const selectedCardLabelsSelector = createSelector(
  selectedCardSelector,
  labelTypesSelector,
  (selectedCard, types) => selectedCard.labels.map(label => types[label])
)
