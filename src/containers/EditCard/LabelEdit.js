import React, { PropTypes } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { CirclePicker } from 'react-color'

import { LabelActions } from '../../redux/labelTypes'

class LabelEdit extends React.Component {
  onDescriptionChange = (event, data) => {
    this.props.setLabelDescription(data.value, this.props.labelType.id)
  }

  onColourChange = colour => {
    this.props.setLabelColour(colour.hex, this.props.labelType.id)
  }

  deleteLabel = () => {
    this.props.stopEditing()
    this.props.deleteLabel(this.props.labelType.id)
  }

  render() {
    const { labelType } = this.props
    return (
      <div className="label-dropdown-item" style={this.props.style}>
        <Input
          onChange={this.onDescriptionChange}
          value={labelType.description}
          size="small"
        />
        <div style={{ padding: '30px 0' }}>
          <CirclePicker
            color={labelType.colour}
            onChangeComplete={this.onColourChange}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button positive onClick={this.props.stopEditing}>
            Done
          </Button>
          <Button negative onClick={this.deleteLabel}>
            Delete
          </Button>
        </div>
      </div>
    )
  }
}

LabelEdit.propTypes = {
  labelType: PropTypes.object,
  setLabelDescription: PropTypes.func,
  setLabelColour: PropTypes.func,
  deleteLabel: PropTypes.func,
  style: PropTypes.object,
  stopEditing: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  setLabelDescription: (description, labelId) =>
    dispatch(LabelActions.setLabelDescription(description, labelId)),
  setLabelColour: (colour, labelId) =>
    dispatch(LabelActions.setLabelColour(colour, labelId)),
  deleteLabel: labelId => dispatch(LabelActions.deleteLabel(labelId))
})

export default connect(null, mapDispatchToProps)(LabelEdit)
