import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Header, Divider } from 'semantic-ui-react'

import {
  labelTypesArraySelector,
  selectedCardLabelsSelector
} from '../../redux'
import { LabelActions } from '../../redux/labelTypes'
import LabelList from './LabelList'
import LabelEdit from './LabelEdit'

class LabelDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editingLabel: null
    }
  }

  addLabelType = update => {
    this.props.addLabelType(update.description)
  }

  toggleLabel = labelId => {
    this.props.onToggleLabel(labelId)
  }

  toggleLabelEdit = labelId => {
    if (this.state.editingLabel) {
      this.setState({ editingLabel: null })
    } else {
      this.setState({ editingLabel: labelId })
    }
  }

  render() {
    return (
      <div className="label-dropdown">
        <Header size="mini">
          {this.state.editingLabel ? 'Edit Label' : 'Labels'}
        </Header>
        <Divider />
        <LabelList
          labelTypes={this.props.labelTypes}
          selectedCardLabels={this.props.selectedCardLabels}
          toggleLabel={this.toggleLabel}
          toggleLabelEdit={this.toggleLabelEdit}
          addLabelType={this.addLabelType}
          // We need the element to be there and hidden, or else the click is deemed to be outside the menu so the popup closes
          style={{ display: this.state.editingLabel ? 'none' : 'block' }}
        />
        <LabelEdit
          labelType={
            this.props.labelTypes.find(
              labelType => labelType.id === this.state.editingLabel
            ) || {}
          }
          stopEditing={this.toggleLabelEdit}
          // We need the element to be there and hidden, or else the click is deemed to be outside the menu so the popup closes
          style={{ display: this.state.editingLabel ? 'block' : 'none' }}
        />
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
