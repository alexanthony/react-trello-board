import React, { PropTypes } from 'react'

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object
}

const Card = props => {
  const { style, item } = props

  return (
    <div style={style} className="item" id={style ? item.id : null}>
      <div className="item-container">
        <div className="item-content">
          <div className="item-name">{`${item.title}`}</div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = propTypes

export default Card
