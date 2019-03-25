import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from './DraggableCard'

class Cards extends Component {
  static propTypes = {
    moveCard: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    x: PropTypes.number.isRequired,
    isOver: PropTypes.bool,
    item: PropTypes.object,
    canDrop: PropTypes.bool,
  }
  render() {
    const { x, cards } = this.props

    return (
      <div className="desk-items">
        {cards.map((item, i) => (
          <Card x={x} y={i} item={item} key={`${item.id}_${item.title}`} />
        ))}
      </div>
    )
  }
}

export default Cards
