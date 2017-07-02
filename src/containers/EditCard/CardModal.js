import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { RIEInput } from 'riek'

import { EditActions } from '../../reducers/edit'
import { selectedCardSelector, selectedCardListSelector } from '../../reducers'
import { setCardTitle } from '../../actions/lists'

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  content: {
    left: '30%',
    right: '30%',
    bottom: '30%',
    backgroundColor: '#edeff0'
  }
}

const EditModal = ({ showModal, onHideModal, card, onTitleChange, list }) =>
  <Modal isOpen={showModal} onRequestClose={onHideModal} style={modalStyle}>
    <RIEInput
      propName="title"
      value={card.title}
      change={update => onTitleChange(card.id, update.title, list.id)}
    />
  </Modal>

EditModal.propTypes = {
  showModal: PropTypes.bool,
  onHideModal: PropTypes.func,
  card: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  }),
  onTitleChange: PropTypes.func,
  list: PropTypes.shape({
    id: PropTypes.string
  })
}

const mapStateToProps = state => ({
  showModal: state.edit.editCard !== null,
  card: selectedCardSelector(state),
  list: selectedCardListSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onHideModal: () => dispatch(EditActions.dismissEditCard()),
  onTitleChange: (cardId, newTitle, listId) =>
    dispatch(setCardTitle(cardId, newTitle, listId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)
