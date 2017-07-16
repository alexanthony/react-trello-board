const actionTypes = {
  SHOW_MODAL: 'SHOW_MODAL',
  DISMISS_MODAL: 'DISMISS_MODAL'
}

const actionCreators = {
  setModal: modal => ({ type: actionTypes.SHOW_MODAL, modal }),
  dismissModal: () => ({ type: actionTypes.DISMISS_MODAL })
}

export const Modals = {
  PREFERENCES: 'PREFERENCES'
}

export const UIActions = actionCreators

const modal = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return action.modal
    case actionTypes.DISMISS_MODAL:
      return null
    default:
      return state
  }
}

export const reducer = modal
