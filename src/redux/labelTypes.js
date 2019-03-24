// import { REHYDRATE } from 'redux-persist/constants'
import shortid from 'shortid'

import { randomColour } from '../utils'

export const actionTypes = {
  ADD_LABEL_TYPE: 'ADD_LABEL_TYPE',
  SET_LABEL_DESCRIPTION: 'SET_LABEL_DESCRIPTION',
  SET_LABEL_COLOUR: 'SET_LABEL_COLOUR',
  DELETE_LABEL: 'DELETE_LABEL'
}

const actionCreators = {
  addLabelType: description => ({
    type: actionTypes.ADD_LABEL_TYPE,
    description,
    colour: randomColour(),
    id: shortid.generate()
  }),
  setLabelDescription: (description, labelId) => ({
    type: actionTypes.SET_LABEL_DESCRIPTION,
    description,
    id: labelId
  }),
  setLabelColour: (colour, labelId) => ({
    type: actionTypes.SET_LABEL_COLOUR,
    colour,
    id: labelId
  }),
  deleteLabel: labelId => ({
    type: actionTypes.DELETE_LABEL,
    labelId
  })
}

export const LabelActions = actionCreators

const label = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_LABEL_TYPE:
      return {
        id: action.id,
        description: action.description,
        colour: action.colour
      }
    case actionTypes.SET_LABEL_COLOUR:
      return { ...state, colour: action.colour }
    case actionTypes.SET_LABEL_DESCRIPTION:
      return { ...state, description: action.description }
    default:
      return state
  }
}

export const reducer = (state = {}, action) => {
  let incoming
  let newState
  switch (action.type) {
    case actionTypes.ADD_LABEL_TYPE:
    case actionTypes.SET_LABEL_COLOUR:
    case actionTypes.SET_LABEL_DESCRIPTION:
      return {
        ...state,
        [action.id]: label(state[action.id], action)
      }
    case actionTypes.DELETE_LABEL:
      newState = { ...state }
      delete newState[action.labelId]
      return newState
    // case REHYDRATE:
    //   incoming = action.payload.labelTypes
    //   if (incoming) return { ...state, ...incoming }
    //   return state
    default:
      return state
  }
}
