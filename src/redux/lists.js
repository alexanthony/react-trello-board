import { REHYDRATE } from 'redux-persist/constants'

import {
  MOVE_CARD,
  MOVE_LIST,
  TOGGLE_DRAGGING,
  ADD_CARD,
  SET_LIST_NAME,
  ADD_LIST
} from '../actions/lists'

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
    case MOVE_CARD: {
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
    case MOVE_LIST: {
      const newLists = [...state.lists]
      const { lastX, nextX } = action
      const t = newLists.splice(lastX, 1)[0]

      newLists.splice(nextX, 0, t)

      return { ...state, lists: newLists }
    }
    case TOGGLE_DRAGGING: {
      return { ...state, isDragging: action.isDragging }
    }
    case ADD_CARD: {
      const newLists = [...state.lists]
      newLists[action.listId] = {
        ...newLists[action.listId],
        cards: [...newLists[action.listId].cards, action.id]
      }

      return { ...state, lists: newLists }
    }
    case SET_LIST_NAME: {
      const newLists = [...state.lists]
      const thisListPos = newLists.findIndex(list => list.id === action.listId)
      newLists[thisListPos] = {
        ...newLists[thisListPos],
        name: action.newName
      }

      return { ...state, lists: newLists }
    }
    case ADD_LIST: {
      const newLists = [...state.lists]
      newLists.push({
        name: 'New List',
        cards: [],
        id: newLists.length
      })

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
