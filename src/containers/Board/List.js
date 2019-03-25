import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RIEInput } from 'riek'
import { Button, Popup, Header, Divider } from 'semantic-ui-react'

import { ListActions } from '../../redux/lists'
import Card from './Cards/Card'
import { cardsByListSelector } from '../../redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import ListContainer from './ListContainer'

const ListHeader = styled.div`
  padding: 5px 8px;
  margin-bottom: 10px;
  position: relative;
`

const ListFooter = styled.button`
  color: #acacac;
  padding: 8px 10px;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-radius: 0 0 3px 3px;
  &:hover {
    color: #4d4d4d;
    background-color: #cdd2d4;
    text-decoration: underline;
  }
`

const ListName = styled.div`
  font-weight: bold;
  white-space: normal;
  width: 100%;
  min-height: 24px;
`

const ActionsMenu = styled.div`
  width: 270px;
`

const ListCards = styled.div`
  min-height: 20px;
`

class List extends Component {
  static propTypes = {
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool,
    addCard: PropTypes.func,
    setListName: PropTypes.func,
    cards: PropTypes.array,
    deleteList: PropTypes.func,
  }

  onAddClicked = () => {
    this.props.addCard(this.props.x)
  }

  onListTitleChange = update => {
    this.props.setListName(this.props.item.id, update.name)
  }

  onDeleteList = () => {
    this.props.deleteList(this.props.item.id)
  }

  render() {
    const { item, x, cards } = this.props

    return (
      <Draggable draggableId={`${this.props.x}`} index={this.props.x}>
        {(draggableProvided, { isDragging }) => (
          <ListContainer
            isDragging={isDragging}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            ref={draggableProvided.innerRef}
          >
            <ListHeader>
              <ListName>
                <RIEInput
                  propName="name"
                  value={item.name}
                  change={this.onListTitleChange}
                  className="desk-name-base"
                  classEditing="desk-name-editing"
                />
              </ListName>
              <Popup
                trigger={
                  <Button
                    icon="ellipsis vertical"
                    className="list-menu-button"
                    size="mini"
                  />
                }
                on="click"
                position="right center"
                basic
              >
                <ActionsMenu>
                  <Header size="small">List Actions</Header>
                  <Divider />
                  <a href="#" onClick={this.onDeleteList}>
                    Delete List
                  </a>
                </ActionsMenu>
              </Popup>
            </ListHeader>
            <Droppable droppableId={`${this.props.x}`} type="card">
              {provided => (
                <ListCards {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((item, i) => (
                    <Card
                      x={x}
                      y={i}
                      item={item}
                      key={`${item.id}_${item.title}`}
                    />
                  ))}
                  {provided.placeholder}
                </ListCards>
              )}
            </Droppable>
            <ListFooter onClick={this.onAddClicked}>Add a card...</ListFooter>
          </ListContainer>
        )}
      </Draggable>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  cards: cardsByListSelector(state)[ownProps.item.id],
})

const mapDispatchToProps = dispatch => ({
  addCard: listId => dispatch(ListActions.addCard(listId, 'New Card')),
  setListName: (listId, newName) =>
    dispatch(ListActions.setListName(listId, newName)),
  deleteList: listId => dispatch(ListActions.deleteList(listId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
