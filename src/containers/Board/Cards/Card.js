import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Label } from 'semantic-ui-react'

import { EditActions } from '../../../redux/edit'
import { labelsByCardSelector } from '../../../redux'
import { labelStyle } from '../../../utils'

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
      {labels.length > 0 &&
        <div className="card-labels">
          {labels.map(label =>
            <Label
              key={label.id}
              style={labelStyle(label.colour)}
              className="card-label-tag"
            >
              {label.description}
            </Label>
          )}
        </div>}
    </div>
  )
}

// TODO - labels div should be flexbox

Card.propTypes = propTypes

const mapStateToProps = (state, ownProps) => ({
  labels: labelsByCardSelector(state)[ownProps.item.id]
})

const mapDispatchToProps = dispatch => ({
  onCardClick: id => dispatch(EditActions.setEditCard(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
