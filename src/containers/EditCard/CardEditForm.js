import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Popup, Header } from 'semantic-ui-react'

import { EditActions } from '../../redux/edit'
import {
  selectedCardSelector,
  selectedCardListSelector,
  labelsByCardSelector,
} from '../../redux'
import { CardActions } from '../../redux/cards'
import { ListActions } from '../../redux/lists'
import LabelDropdown from './LabelDropdown'
import MarkdownInlineTextArea from '../MarkdownInlineTextArea'
import Labels from '../Board/Cards/Labels'
import InlineTextEdit from '../InlineTextEdit'
import styled from 'styled-components'

const FormWrapper = styled.section`
  height: 100%;
  width: 100%;
  background-color: #f3f3f3;
  padding: 10px;
`

const CardListName = styled.div`
  padding: 5px;
`

const CardActionsContainer = styled.div`
  margin-top: 20px;
`

const CloseButton = styled(Button)`
  position: absolute;
  top: 4px;
  right: 4px;
`

class CardEditForm extends Component {
  state = { showLabelMenu: false }

  onTitleChange = newTitle => {
    this.props.onTitleChange(this.props.card.id, newTitle)
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
    const { onHideModal, card = { title: '' }, list } = this.props
    return (
      <FormWrapper>
        <CloseButton icon="times" onClick={onHideModal} />
        <InlineTextEdit value={card.title} onChange={this.onTitleChange} bold />
        <CardListName>
          <span>
            from list <u>{list.name}</u>
          </span>
        </CardListName>
        {card.description && card.description !== '' && (
          <Header size="small">Description</Header>
        )}
        <MarkdownInlineTextArea
          onChange={this.onDescriptionChange}
          value={card.description}
        />
        <a
          href="http://commonmark.org/help/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Markdown Guide
        </a>
        {this.props.labels && this.props.labels.length > 0 && (
          <Header size="small">Labels</Header>
        )}
        <Labels labels={this.props.labels} />
        <CardActionsContainer>
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
        </CardActionsContainer>
      </FormWrapper>
    )
  }
}

CardEditForm.propTypes = {
  onHideModal: PropTypes.func,
  card: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  onTitleChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  onDeleteCard: PropTypes.func,
  list: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  toggleLabel: PropTypes.func,
  labels: PropTypes.array,
}

const mapStateToProps = state => ({
  card: selectedCardSelector(state),
  list: selectedCardListSelector(state),
  labels: labelsByCardSelector(state)[state.edit.editCard],
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
    dispatch(CardActions.toggleLabel(cardId, labelId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardEditForm)
