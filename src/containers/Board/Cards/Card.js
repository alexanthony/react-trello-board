import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { EditActions } from '../../../redux/edit'
import { labelsByCardSelector } from '../../../redux'
import Labels from './Labels'
import { Draggable } from 'react-beautiful-dnd'

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object,
  onCardClick: PropTypes.func,
  labels: PropTypes.array,
}

const Card = props => {
  const { style, item, onCardClick, labels } = props

  return (
    <Draggable draggableId={item.id} index={props.y}>
      {provided => (
        <div
          onClick={() => onCardClick(item.id)}
          style={style}
          className="item"
          id={style ? item.id : null}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="item-container">
            <div className="item-content">
              <div className="item-name">{item.title}</div>
            </div>
          </div>
          <Labels labels={labels} />
        </div>
      )}
    </Draggable>
  )
}

Card.propTypes = propTypes

const mapStateToProps = (state, ownProps) => ({
  labels: labelsByCardSelector(state)[ownProps.item.id],
})

const mapDispatchToProps = {
  onCardClick: EditActions.setEditCard,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card)
