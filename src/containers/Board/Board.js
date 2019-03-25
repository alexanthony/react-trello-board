import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'

import { ListActions } from '../../redux/lists'

import CardsContainer from './Cards/CardsContainer'
import CardModal from '../EditCard/CardModal'
import NewListPlaceholder from './NewListPlaceholder'
import { Droppable } from 'react-beautiful-dnd'

class Board extends Component {
  static propTypes = {
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
    addList: PropTypes.func.isRequired,
  }

  moveCard = params => {
    const { source, destination } = params
    if (!destination) return
    this.props.moveCard(
      parseInt(source.droppableId, 10),
      source.index,
      parseInt(destination.droppableId, 10),
      destination.index
    )
  }

  moveList = params => {
    const { source, destination } = params
    if (!destination) return
    this.props.moveList(source.index, destination.index)
  }

  handleDragEnd = params => {
    // console.log(params)
    const { type } = params
    if (type === 'list') {
      this.moveList(params)
    } else {
      this.moveCard(params)
    }
  }

  render() {
    const { lists } = this.props

    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <CardModal />
        <div className="board">
          <Droppable droppableId="board" direction="horizontal" type="list">
            {provided => (
              <div
                className="board-inner"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((item, i) => (
                  <CardsContainer
                    key={item.id}
                    id={item.id}
                    item={item}
                    moveCard={this.moveCard}
                    moveList={this.moveList}
                    x={i}
                  />
                ))}
                {provided.placeholder}
                <NewListPlaceholder onAddList={this.props.addList} />
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    )
  }
}

const mapStateToProps = state => ({
  lists: state.lists.lists,
})

const mapDispatchToProps = {
  moveCard: ListActions.moveCard,
  moveList: ListActions.moveList,
  addList: ListActions.addList,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
