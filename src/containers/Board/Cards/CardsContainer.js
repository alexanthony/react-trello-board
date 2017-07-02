import React, { Component, PropTypes } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import { RIEInput } from 'riek'

import { addCard, setListName } from '../../../actions/lists'
import Cards from './Cards'

class CardsContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool,
    addCard: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.onAddClicked = this.onAddClicked.bind(this)
    this.onListTitleChange = this.onListTitleChange.bind(this)
  }

  onAddClicked() {
    this.props.addCard(this.props.x)
  }

  onListTitleChange(update) {
    this.props.setListName(this.props.item.id, update.name)
  }

  render() {
    const {
      connectDropTarget,
      connectDragSource,
      item,
      x,
      moveCard,
      isDragging
    } = this.props
    const opacity = isDragging ? 0.5 : 1

    return connectDragSource(
      connectDropTarget(
        <div className="desk-container">
          <div className="desk" style={{ opacity }}>
            <div className="desk-head">
              <div className="desk-name">
                <RIEInput
                  propName="name"
                  value={item.name}
                  change={this.onListTitleChange}
                />
              </div>
            </div>
            <Cards
              moveCard={moveCard}
              x={x}
              cards={item.cards}
              startScrolling={this.props.startScrolling}
              stopScrolling={this.props.stopScrolling}
              isScrolling={this.props.isScrolling}
            />
            <a className="add-card" href="#" onClick={this.onAddClicked}>
              Add a card...
            </a>
          </div>
        </div>
      )
    )
  }
}

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    }
  },
  endDrag(props) {
    props.stopScrolling()
  }
}

const listTarget = {
  canDrop() {
    return false
  },
  hover(props, monitor) {
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight')
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft')
      }
    } else {
      if (
        window.innerWidth - monitor.getClientOffset().x > 200 &&
        monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling()
      }
    }
    const { id: listId } = monitor.getItem()
    const { id: nextX } = props
    if (listId !== nextX) {
      props.moveList(listId, props.x)
    }
  }
}

const mapDispatchToProps = dispatch => ({
  addCard: listId => dispatch(addCard(listId, 'New Card')),
  setListName: (listId, newName) => dispatch(setListName(listId, newName))
})

export default DropTarget('list', listTarget, connectDragSource => ({
  connectDropTarget: connectDragSource.dropTarget()
}))(
  DragSource('list', listSource, (connectDragSource, monitor) => ({
    connectDragSource: connectDragSource.dragSource(),
    isDragging: monitor.isDragging()
  }))(connect(null, mapDispatchToProps)(CardsContainer))
)
