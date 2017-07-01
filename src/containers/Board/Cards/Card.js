import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { EditActions } from '../../../reducers/edit'

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object,
  onCardClick: PropTypes.func
}

const Card = props => {
  const { style, item, onCardClick } = props

  return (
    <div
      onClick={() => onCardClick(item.id)}
      style={style}
      className="item"
      id={style ? item.id : null}
    >
      <div className="item-container">
        <div className="item-content">
          <div className="item-name">{`${item.title}`}</div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = propTypes

const mapDispatchToProps = dispatch => ({
  onCardClick: id => dispatch(EditActions.setEditCard(id))
})

export default connect(null, mapDispatchToProps)(Card)
