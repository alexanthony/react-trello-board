import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { RIEInput } from 'riek'

import { EditActions } from '../../redux/edit'
import { selectedCardSelector, selectedCardListSelector } from '../../redux'
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

const CardModal = ({
  showModal,
  onHideModal,
  card = { title: '' },
  onTitleChange,
  list
}) =>
  <Modal isOpen={showModal} onRequestClose={onHideModal} style={modalStyle}>
    <RIEInput
      propName="title"
      value={card.title}
      change={update => onTitleChange(card.id, update.title)}
      className="card-title"
      classEditing="card-title-editing"
    />
    <div className="card-list-name">
      <span>
        from list {list.name}
      </span>
    </div>
  </Modal>

CardModal.propTypes = {
  showModal: PropTypes.bool,
  onHideModal: PropTypes.func,
  card: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  }),
  onTitleChange: PropTypes.func,
  list: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
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

export default connect(mapStateToProps, mapDispatchToProps)(CardModal)
