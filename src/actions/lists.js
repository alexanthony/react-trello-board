import uniqueId from 'lodash/uniqueId'

export const MOVE_CARD = 'MOVE_CARD'
export const MOVE_LIST = 'MOVE_LIST'
export const TOGGLE_DRAGGING = 'TOGGLE_DRAGGING'
export const ADD_CARD = 'ADD_CARD'
export const SET_CARD_TITLE = 'SET_CARD_TITLE'
export const SET_LIST_NAME = 'SET_LIST_NAME'
export const ADD_LIST = 'ADD_LIST'

export const moveList = (lastX, nextX) => dispatch => {
  dispatch({ type: MOVE_LIST, lastX, nextX })
}

export const moveCard = (lastX, lastY, nextX, nextY) => dispatch => {
  dispatch({ type: MOVE_CARD, lastX, lastY, nextX, nextY })
}

export const toggleDragging = isDragging => dispatch => {
  dispatch({ type: TOGGLE_DRAGGING, isDragging })
}

export const addCard = (listId, title) => ({
  type: ADD_CARD,
  title,
  listId,
  id: uniqueId()
})

export const setCardTitle = (cardId, newTitle, listId) => ({
  type: SET_CARD_TITLE,
  cardId,
  newTitle,
  listId
})

export const setListName = (listId, newName) => ({
  type: SET_LIST_NAME,
  listId,
  newName
})

export const addList = () => ({
  type: ADD_LIST
})
