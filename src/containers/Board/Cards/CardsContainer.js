import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RIEInput } from 'riek'
import { Button, Popup, Header, Divider } from 'semantic-ui-react'

import { ListActions } from '../../../redux/lists'
import Cards from './Cards'
import { cardsByListSelector } from '../../../redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'

class CardsContainer extends Component {
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

  constructor(props) {
    super(props)
    this.onAddClicked = this.onAddClicked.bind(this)
    this.onListTitleChange = this.onListTitleChange.bind(this)
    this.onDeleteList = this.onDeleteList.bind(this)
  }

  onAddClicked() {
    this.props.addCard(this.props.x)
  }

  onListTitleChange(update) {
    this.props.setListName(this.props.item.id, update.name)
  }

  onDeleteList() {
    this.props.deleteList(this.props.item.id)
  }

  render() {
    const { item, x, moveCard, isDragging, cards } = this.props
    const opacity = isDragging ? 0.5 : 1

    return (
      <Draggable draggableId={`${this.props.x}`} index={this.props.x}>
        {draggableProvided => (
          <div
            className="desk-container"
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            ref={draggableProvided.innerRef}
          >
            <Droppable droppableId={`${this.props.x}`} type="card">
              {provided => (
                <div
                  className="desk"
                  style={{ opacity }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="desk-head">
                    <div className="desk-name">
                      <RIEInput
                        propName="name"
                        value={item.name}
                        change={this.onListTitleChange}
                        className="desk-name-base"
                        classEditing="desk-name-editing"
                      />
                    </div>
                    <div>
                      <Popup
                        trigger={
                          <Button
                            icon="ellipsis vertical"
                            className="list-menu-button"
                            size="mini"
                          />
                        }
                        on="click"
                        position="right-center"
                        basic
                      >
                        <div className="list-menu">
                          <Header size="small">List Actions</Header>
                          <Divider />
                          <a href="#" onClick={this.onDeleteList}>
                            Delete List
                          </a>
                        </div>
                      </Popup>
                    </div>
                  </div>
                  <Cards
                    moveCard={moveCard}
                    x={x}
                    cards={cards}
                    startScrolling={this.props.startScrolling}
                    stopScrolling={this.props.stopScrolling}
                    isScrolling={this.props.isScrolling}
                  />
                  {provided.placeholder}
                  <a className="add-card" href="#" onClick={this.onAddClicked}>
                    Add a card...
                  </a>
                </div>
              )}
            </Droppable>
          </div>
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
)(CardsContainer)
