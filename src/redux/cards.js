import { actionTypes as ListActionTypes } from './lists'
import { isBlank } from '../utils'
import { actionTypes as LabelActionTypes } from './labelTypes'

export const actionTypes = {
  SET_CARD_TITLE: 'SET_CARD_TITLE',
  SET_CARD_DESCRIPTION: 'SET_CARD_DESCRIPTION',
  TOGGLE_LABEL: 'TOGGLE_LABEL',
}

const actionCreators = {
  setCardTitle: (cardId, newTitle) => ({
    type: actionTypes.SET_CARD_TITLE,
    cardId,
    newTitle: isBlank(newTitle) ? 'Card' : newTitle,
  }),
  setCardDescription: (cardId, newDescription) => ({
    type: actionTypes.SET_CARD_DESCRIPTION,
    cardId,
    newDescription,
  }),
  toggleLabel: (cardId, labelId) => ({
    type: actionTypes.TOGGLE_LABEL,
    cardId,
    labelId,
  }),
}

export const CardActions = actionCreators

const toggleItemInList = (list, item) => {
  const index = list.indexOf(item)
  if (index !== -1) {
    const newList = [...list]
    newList.splice(index, 1)
    return newList
  }
  return [...list, item]
}

const card = (state = {}, action) => {
  switch (action.type) {
    case ListActionTypes.ADD_CARD:
      return {
        id: action.cardId,
        title: action.title,
        description: '',
        labels: [],
      }
    case actionTypes.SET_CARD_TITLE:
      return { ...state, title: action.newTitle }
    case actionTypes.SET_CARD_DESCRIPTION:
      return { ...state, description: action.newDescription }
    case actionTypes.TOGGLE_LABEL:
      return {
        ...state,
        labels: toggleItemInList(state.labels, action.labelId),
      }
    case LabelActionTypes.DELETE_LABEL:
      if (state.labels.indexOf(action.labelId) === -1) {
        return state
      }
      return {
        ...state,
        labels: state.labels.filter(labelType => labelType !== action.labelId),
      }
    default:
      return state
  }
}

export const reducer = (state = {}, action) => {
  let newState
  switch (action.type) {
    case ListActionTypes.ADD_CARD:
    case actionTypes.SET_CARD_TITLE:
    case actionTypes.SET_CARD_DESCRIPTION:
    case actionTypes.TOGGLE_LABEL:
      return { ...state, [action.cardId]: card(state[action.cardId], action) }
    case ListActionTypes.DELETE_CARD:
      newState = { ...state }
      delete newState[action.cardId]
      return newState
    case LabelActionTypes.DELETE_LABEL:
      newState = { ...state }
      Object.keys(state).forEach(cardId => {
        newState[cardId] = card(state[cardId], action)
      })
      return newState
    default:
      return state
  }
}
