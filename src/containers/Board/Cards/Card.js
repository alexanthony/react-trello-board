import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { EditActions } from '../../../redux/edit'
import { labelsByCardSelector } from '../../../redux'
import Labels from './Labels'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const CardContainer = styled.div`
  width: 90%;
  margin: 0 auto 10px;
  background: #fff;
  min-height: 40px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  transition: 0.15s;
  cursor: pointer;
  &:hover {
    background: #f7f7f7;
  }
`

const CardContent = styled.div`
  padding: 10px;
  white-space: normal;
  word-break: keep-all;
  word-wrap: break-world;
`

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object,
  onCardClick: PropTypes.func,
  labels: PropTypes.array,
  y: PropTypes.number,
}

class Card extends PureComponent {
  handleCardClick = () => {
    this.props.onCardClick(this.props.item.id)
  }

  render() {
    const { item, labels, y } = this.props

    return (
      <Draggable draggableId={item.id} index={y}>
        {provided => (
          <CardContainer
            onClick={this.handleCardClick}
            id={item ? item.id : null}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <CardContent>{item.title}</CardContent>
            <Labels labels={labels} />
          </CardContainer>
        )}
      </Draggable>
    )
  }
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
