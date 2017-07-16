import { REHYDRATE } from 'redux-persist/constants'
import shortid from 'shortid'

import { isBlank } from '../utils'

export const actionTypes = {
  MOVE_CARD: 'MOVE_CARD',
  MOVE_LIST: 'MOVE_LIST',
  TOGGLE_DRAGGING: 'TOGGLE_DRAGGING',
  ADD_CARD: 'ADD_CARD',
  SET_LIST_NAME: 'SET_LIST_NAME',
  ADD_LIST: 'ADD_LIST',
  DELETE_CARD: 'DELETE_CARD'
}

const actionCreators = {
  moveList: (lastX, nextX) => ({ type: actionTypes.MOVE_LIST, lastX, nextX }),
  moveCard: (lastX, lastY, nextX, nextY) => ({
    type: actionTypes.MOVE_CARD,
    lastX,
    lastY,
    nextX,
    nextY
  }),
  toggleDragging: isDragging => ({
    type: actionTypes.TOGGLE_DRAGGING,
    isDragging
  }),
  addCard: (listId, title) => ({
    type: actionTypes.ADD_CARD,
    title,
    listId,
    cardId: shortid.generate()
  }),

  setListName: (listId, newName) => ({
    type: actionTypes.SET_LIST_NAME,
    listId,
    newName: isBlank(newName) ? 'List' : newName
  }),

  addList: () => ({
    type: actionTypes.ADD_LIST
  }),

  deleteCard: cardId => ({
    type: actionTypes.DELETE_CARD,
    cardId
  })
}

export const ListActions = actionCreators

/* eslint-disable new-cap */
const initialState = {
  isFetching: false,
  lists: [],
  isDragging: false
}
// const initialState = new InitialState()
/* eslint-enable new-cap */

const lists = (state = initialState, action) => {
  let incoming
  switch (action.type) {
    case actionTypes.MOVE_CARD: {
      const newLists = [...state.lists]
      const { lastX, lastY, nextX, nextY } = action
      if (lastX === nextX) {
        newLists[lastX].cards.splice(
          nextY,
          0,
          newLists[lastX].cards.splice(lastY, 1)[0]
        )
      } else {
        // move element to new place
        newLists[nextX].cards.splice(nextY, 0, newLists[lastX].cards[lastY])
        // delete element from old place
        newLists[lastX].cards.splice(lastY, 1)
      }
      return { ...state, lists: newLists }
    }
    case actionTypes.MOVE_LIST: {
      const newLists = [...state.lists]
      const { lastX, nextX } = action
      const t = newLists.splice(lastX, 1)[0]

      newLists.splice(nextX, 0, t)

      return { ...state, lists: newLists }
    }
    case actionTypes.TOGGLE_DRAGGING: {
      return { ...state, isDragging: action.isDragging }
    }
    case actionTypes.ADD_CARD: {
      const newLists = [...state.lists]
      newLists[action.listId] = {
        ...newLists[action.listId],
        cards: [...newLists[action.listId].cards, action.cardId]
      }

      return { ...state, lists: newLists }
    }
    case actionTypes.SET_LIST_NAME: {
      const newLists = [...state.lists]
      const thisListPos = newLists.findIndex(list => list.id === action.listId)
      newLists[thisListPos] = {
        ...newLists[thisListPos],
        name: action.newName
      }

      return { ...state, lists: newLists }
    }
    case actionTypes.ADD_LIST: {
      const newLists = [...state.lists]
      newLists.push({
        name: 'New List',
        cards: [],
        id: newLists.length
      })

      return { ...state, lists: newLists }
    }
    case actionTypes.DELETE_CARD: {
      const newLists = [...state.lists]
      const listWithCardPos = newLists.findIndex(
        list => list && list.cards.indexOf(action.cardId) !== -1
      )
      const listWithCard = newLists[listWithCardPos]
      // const cardPos = listWithCard.cards.indexOf(action.cardId)
      newLists[listWithCardPos] = {
        ...listWithCard,
        cards: [
          ...listWithCard.cards.filter(cardId => cardId !== action.cardId)
        ]
      }
      return { ...state, lists: newLists }
    }
    case REHYDRATE:
      incoming = action.payload.lists
      if (incoming) return { ...state, ...incoming }
      return state
    default:
      return state
  }
}

export default lists
