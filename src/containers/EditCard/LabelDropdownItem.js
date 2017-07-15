import React, { PropTypes } from 'react'
import { Button, Input, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { TwitterPicker } from 'react-color'

import { labelStyle } from '../../utils'
import { LabelActions } from '../../redux/labelTypes'

class LabelDropdownItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editing: false }
  }

  onDescriptionChange = (event, data) => {
    this.props.setLabelDescription(data.value, this.props.labelType.id)
  }

  onColourChange = colour => {
    this.props.setLabelColour(colour.hex, this.props.labelType.id)
  }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing })
  }

  toggleLabel = () => {
    this.props.toggleLabel(this.props.labelType.id)
  }

  render() {
    const { labelType, selected } = this.props
    return (
      <div className="label-dropdown-item">
        {this.state.editing &&
          <Input
            onChange={this.onDescriptionChange}
            value={labelType.description}
            size="small"
            style={{ width: '100px', marginRight: '5px' }}
          />}

        {!this.state.editing &&
          <input
            type="button"
            style={labelStyle(labelType.colour)}
            className="label-dropdown-item-bar"
            onClick={this.toggleLabel}
            value={labelType.description}
          />}
        {this.state.editing &&
          <Popup
            trigger={
              <Button
                style={{
                  backgroundColor: labelType.colour
                }}
                className="swatch-button"
              />
            }
            on="click"
            position="right center"
            basic
          >
            <TwitterPicker
              color={labelType.colour}
              onChangeComplete={this.onColourChange}
            />
          </Popup>}
        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
          <Button
            icon="checkmark"
            circular
            positive={selected}
            onClick={this.toggleLabel}
          />
          <Button icon="write" circular primary onClick={this.toggleEdit} />
        </div>
      </div>
    )
  }
}

LabelDropdownItem.propTypes = {
  labelType: PropTypes.object,
  toggleLabel: PropTypes.func,
  selected: PropTypes.bool,
  setLabelDescription: PropTypes.func,
  setLabelColour: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  setLabelDescription: (description, labelId) =>
    dispatch(LabelActions.setLabelDescription(description, labelId)),
  setLabelColour: (colour, labelId) =>
    dispatch(LabelActions.setLabelColour(colour, labelId))
})

export default connect(null, mapDispatchToProps)(LabelDropdownItem)
