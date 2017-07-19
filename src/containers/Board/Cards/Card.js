import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { EditActions } from '../../../redux/edit'
import { labelsByCardSelector } from '../../../redux'
import Labels from './Labels'

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object,
  onCardClick: PropTypes.func,
  labels: PropTypes.array
}

const Card = props => {
  const { style, item, onCardClick, labels } = props

  return (
    <div
      onClick={() => onCardClick(item.id)}
      style={style}
      className="item"
      id={style ? item.id : null}
    >
      <div className="item-container">
        <div className="item-content">
          <div className="item-name">
            {item.title}
          </div>
        </div>
      </div>
      <Labels labels={labels} />
    </div>
  )
}

Card.propTypes = propTypes

const mapStateToProps = (state, ownProps) => ({
  labels: labelsByCardSelector(state)[ownProps.item.id]
})

const mapDispatchToProps = dispatch => ({
  onCardClick: id => dispatch(EditActions.setEditCard(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
