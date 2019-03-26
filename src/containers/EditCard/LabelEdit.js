import React from 'react'
import PropTypes from 'prop-types'
import { Button, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { CirclePicker } from 'react-color'
import styled from 'styled-components'

import { LabelActions } from '../../redux/labelTypes'

const LabelEditWrapper = styled.div`
  display: ${props => (props.editing ? 'block' : 'none')};
  margin-bottom: 10px;
`

const ColourPickerContainer = styled.div`
  padding: 30px 0;
`

const LabelActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

class LabelEdit extends React.Component {
  static defaultProps = {
    labelType: {},
  }
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
    const { labelType, editing } = this.props
    return (
      <LabelEditWrapper editing={editing}>
        <Input
          onChange={this.onDescriptionChange}
          value={labelType.description}
          size="small"
        />
        <ColourPickerContainer>
          <CirclePicker
            color={labelType.colour}
            onChangeComplete={this.onColourChange}
          />
        </ColourPickerContainer>
        <LabelActionsContainer>
          <Button positive onClick={this.props.stopEditing}>
            Done
          </Button>
          <Button negative onClick={this.deleteLabel}>
            Delete
          </Button>
        </LabelActionsContainer>
      </LabelEditWrapper>
    )
  }
}

LabelEdit.propTypes = {
  labelType: PropTypes.object,
  setLabelDescription: PropTypes.func,
  setLabelColour: PropTypes.func,
  deleteLabel: PropTypes.func,
  editing: PropTypes.bool,
  stopEditing: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  setLabelDescription: (description, labelId) =>
    dispatch(LabelActions.setLabelDescription(description, labelId)),
  setLabelColour: (colour, labelId) =>
    dispatch(LabelActions.setLabelColour(colour, labelId)),
  deleteLabel: labelId => dispatch(LabelActions.deleteLabel(labelId)),
})

export default connect(
  null,
  mapDispatchToProps
)(LabelEdit)
