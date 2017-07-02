import { Record } from 'immutable'

import {
  GET_LISTS,
  GET_LISTS_START,
  MOVE_CARD,
  MOVE_LIST,
  TOGGLE_DRAGGING,
  ADD_CARD,
  SET_CARD_TITLE,
  SET_LIST_NAME
} from '../actions/lists'

/* eslint-disable new-cap */
const InitialState = Record({
  isFetching: false,
  lists: [],
  isDragging: false
})
/* eslint-enable new-cap */
const initialState = new InitialState()

const lists = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTS_START:
      return state.set('isFetching', true)
    case GET_LISTS:
      return state.withMutations(ctx => {
        ctx.set('isFetching', false).set('lists', action.lists)
      })
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
      return state.withMutations(ctx => {
        ctx.set('lists', newLists)
      })
    }
    case MOVE_LIST: {
      const newLists = [...state.lists]
      const { lastX, nextX } = action
      const t = newLists.splice(lastX, 1)[0]

      newLists.splice(nextX, 0, t)

      return state.withMutations(ctx => {
        ctx.set('lists', newLists)
      })
    }
    case TOGGLE_DRAGGING: {
      return state.set('isDragging', action.isDragging)
    }
    case ADD_CARD: {
      const newLists = [...state.lists]
      // console.log(JSON.stringify(newLists))
      // console.log(JSON.stringify(newLists[action.listId].cards))
      newLists[action.listId] = {
        ...newLists[action.listId],
        cards: [
          ...newLists[action.listId].cards,
          {
            id: action.id,
            firstName: 'New',
            lastName: 'Card',
            title: action.title
          }
        ]
      }
      // newLists[action.listId].cards = .push()
      // console.log(JSON.stringify(newLists))
      // console.log(JSON.stringify(newLists[action.listId].cards))
      return state.set('lists', newLists)
      // return state.withMutations(ctx => {
      //   ctx.set('lists', newLists)
      // })
    }
    case SET_CARD_TITLE: {
      const newLists = [...state.lists]
      const thisList = newLists.find(list => list.id === action.listId)
      const updatedList = { ...thisList, cards: [...thisList.cards] }
      const thisCardPos = updatedList.cards.findIndex(
        card => card.id === action.cardId
      )
      updatedList.cards[thisCardPos] = {
        ...updatedList.cards[thisCardPos],
        title: action.newTitle
      }
      newLists[action.listId] = updatedList
      const newState = state.set('lists', newLists)

      return newState

      // newLists[action.listId] = {
      //   ...newLists[action.listId],
      //   cards: [
      //     ...newLists[action.listId].cards,
      //     {
      //       id: action.id,
      //       firstName: 'New',
      //       lastName: 'Card',
      //       title: action.title
      //     }
      //   ]
      // }
    }
    case SET_LIST_NAME: {
      const newLists = [...state.lists]
      const thisListPos = newLists.findIndex(list => list.id === action.listId)
      newLists[thisListPos] = {
        ...newLists[thisListPos],
        name: action.newName
      }
      return state.set('lists', newLists)
    }
    default:
      return state
  }
}

export default lists
