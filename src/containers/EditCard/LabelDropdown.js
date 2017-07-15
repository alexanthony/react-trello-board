import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { RIEInput } from 'riek'

import {
  labelTypesArraySelector,
  selectedCardLabelsSelector
} from '../../redux'
import { LabelActions } from '../../redux/labelTypes'
import LabelDropdownItem from './LabelDropdownItem'

class LabelDropdown extends React.Component {
  addLabelType = update => {
    this.props.addLabelType(update.description)
  }

  toggleLabel = labelId => {
    this.props.onToggleLabel(labelId)
  }

  render() {
    return (
      <div className="label-dropdown">
        {this.props.labelTypes.map(labelType =>
          <LabelDropdownItem
            key={labelType.id}
            labelType={labelType}
            toggleLabel={this.toggleLabel}
            selected={
              this.props.selectedCardLabels.findIndex(
                label => label.id === labelType.id
              ) !== -1
            }
          />
        )}
        <div className="add-label-container">
          <RIEInput
            value="Add a label"
            propName="description"
            change={this.addLabelType}
            className="add-label"
            classEditing="add-label-editing"
          />
        </div>
      </div>
    )
  }
}

LabelDropdown.propTypes = {
  labelTypes: PropTypes.array,
  addLabelType: PropTypes.func,
  onToggleLabel: PropTypes.func,
  selectedCardLabels: PropTypes.array
}

const mapStateToProps = state => ({
  labelTypes: labelTypesArraySelector(state),
  selectedCardLabels: selectedCardLabelsSelector(state)
})

const mapDispatchToProps = dispatch => ({
  addLabelType: description => dispatch(LabelActions.addLabelType(description))
})

export default connect(mapStateToProps, mapDispatchToProps)(LabelDropdown)
