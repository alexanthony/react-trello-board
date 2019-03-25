import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

const getStyles = isDragging => ({
  display: isDragging ? 0.5 : 1,
})

class CardComponent extends Component {
  static propTypes = {
    item: PropTypes.object,
    x: PropTypes.number.isRequired,
    y: PropTypes.number,
  }

  render() {
    const { item } = this.props

    return (
      <div>
        <Card style={getStyles(false)} item={item} y={this.props.y} />
      </div>
    )
  }
}

export default CardComponent
