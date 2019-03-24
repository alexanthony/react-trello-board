import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { RIEInput } from 'riek'
import { Button, Popup, Header } from 'semantic-ui-react'

import { EditActions } from '../../redux/edit'
import {
  selectedCardSelector,
  selectedCardListSelector,
  labelsByCardSelector
} from '../../redux'
import { CardActions } from '../../redux/cards'
import { ListActions } from '../../redux/lists'
import LabelDropdown from './LabelDropdown'
import MarkdownInlineTextArea from '../MarkdownInlineTextArea'
import Labels from '../Board/Cards/Labels'

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
class CardModal extends Component {
  constructor(props) {
    super(props)
    this.state = { showLabelMenu: false }
  }
  onTitleChange = update => {
    this.props.onTitleChange(this.props.card.id, update.title)
  }

  onDescriptionChange = newDescription => {
    this.props.onDescriptionChange(this.props.card.id, newDescription)
  }

  onDeleteCard = () => {
    this.props.onDeleteCard(this.props.card.id)
  }

  toggleLabelMenu = () => {
    this.setState({ showLabelMenu: !this.state.showLabelMenu })
  }

  toggleLabel = labelId => {
    this.props.toggleLabel(this.props.card.id, labelId)
  }

  hideLabelMenu = () => {
    this.setState({ showLabelMenu: false })
  }

  render() {
    const { showModal, onHideModal, card = { title: '' }, list } = this.props
    return (
      <Modal
        isOpen={showModal}
        onRequestClose={onHideModal}
        onAfterOpen={this.hideLabelMenu}
        style={modalStyle}
      >
        <RIEInput
          propName="title"
          value={card.title}
          change={this.onTitleChange}
          className="card-title"
          classEditing="card-title-editing"
        />
        <div className="card-list-name">
          <span>
            from list <u>{list.name}</u>
          </span>
        </div>
        {card.description &&
          card.description !== '' &&
          <Header size="small">Description</Header>}
        <MarkdownInlineTextArea
          onChange={this.onDescriptionChange}
          value={card.description}
          className="card-description"
          classNameEditing="card-description-editing"
        />
        <a href="http://commonmark.org/help/" target="_blank">
          Markdown Guide
        </a>
        {this.props.labels &&
          this.props.labels.length > 0 &&
          <Header size="small">Labels</Header>}
        <Labels labels={this.props.labels || []} />
        <div className="card-actions-container">
          <Button onClick={this.onDeleteCard}>Delete</Button>
          <Popup
            trigger={<Button>Labels</Button>}
            on="click"
            position="right center"
            basic
            onClose={this.toggleLabelMenu}
            onOpen={this.toggleLabelMenu}
            open={this.state.showLabelMenu}
          >
            <LabelDropdown onToggleLabel={this.toggleLabel} />
          </Popup>
        </div>
      </Modal>
    )
  }
}

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
  }),
  toggleLabel: PropTypes.func,
  labels: PropTypes.array
}

const mapStateToProps = state => ({
  showModal: state.edit.editCard !== null,
  card: selectedCardSelector(state),
  list: selectedCardListSelector(state),
  labels: labelsByCardSelector(state)[state.edit.editCard]
})

const mapDispatchToProps = dispatch => ({
  onHideModal: () => dispatch(EditActions.dismissEditCard()),
  onTitleChange: (cardId, newTitle) =>
    dispatch(CardActions.setCardTitle(cardId, newTitle)),
  onDescriptionChange: (cardId, newDescription) =>
    dispatch(CardActions.setCardDescription(cardId, newDescription)),
  onDeleteCard: cardId => {
    dispatch(EditActions.dismissEditCard())
    dispatch(ListActions.deleteCard(cardId))
  },
  toggleLabel: (cardId, labelId) =>
    dispatch(CardActions.toggleLabel(cardId, labelId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardModal)
