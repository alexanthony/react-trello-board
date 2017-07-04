import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { RIEInput, RIETextArea } from 'riek'

import { EditActions } from '../../redux/edit'
import { selectedCardSelector, selectedCardListSelector } from '../../redux'
import { CardActions } from '../../redux/cards'
import { ListActions } from '../../redux/lists'

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
  onDescriptionChange,
  onDeleteCard,
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
    <RIETextArea
      propName="description"
      value={card.description}
      change={update => onDescriptionChange(card.id, update.description)}
      className="card-description"
      classEditing="card-description-editing"
      rows={10}
    />
    <input
      type="button"
      className="card-delete-button"
      value="Delete"
      onClick={() => onDeleteCard(card.id)}
    />
  </Modal>

CardModal.propTypes = {
  showModal: PropTypes.bool,
  onHideModal: PropTypes.func,
  card: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  }),
  onTitleChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  onDeleteCard: PropTypes.func,
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
  onTitleChange: (cardId, newTitle) =>
    dispatch(CardActions.setCardTitle(cardId, newTitle)),
  onDescriptionChange: (cardId, newDescription) =>
    dispatch(CardActions.setCardDescription(cardId, newDescription)),
  onDeleteCard: cardId => {
    dispatch(ListActions.deleteCard(cardId))
    dispatch(EditActions.dismissEditCard())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CardModal)
