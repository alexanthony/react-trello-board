import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'

import { ListActions } from '../../redux/lists'

import NewListPlaceholder from './NewListPlaceholder'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import List from './List'

const BoardContainer = styled.div`
  flex-grow: 1;
  position: relative;
  overflow-y: auto;
  height: 100%;
`

const BoardInner = styled.div`
  ${'' /* overflow-x: auto;
  overflow-y: hidden; */}
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  user-select: none;
  white-space: nowrap;
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
`

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
        <BoardContainer>
          <Droppable droppableId="board" direction="horizontal" type="list">
            {provided => (
              <BoardInner {...provided.droppableProps} ref={provided.innerRef}>
                {lists.map((item, i) => (
                  <List
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
              </BoardInner>
            )}
          </Droppable>
        </BoardContainer>
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
