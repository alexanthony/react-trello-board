import React, { PropTypes } from 'react'
import { Button } from 'semantic-ui-react'

import { labelStyle } from '../../utils'

class LabelDropdownItem extends React.Component {
  toggleEdit = () => {
    this.props.toggleLabelEdit(this.props.labelType.id)
  }

  toggleLabel = () => {
    this.props.toggleLabel(this.props.labelType.id)
  }

  render() {
    const { labelType, selected } = this.props
    return (
      <div className="label-dropdown-item">
        <input
          type="button"
          style={labelStyle(labelType.colour)}
          className="label-dropdown-item-bar"
          onClick={this.toggleLabel}
          value={labelType.description}
        />
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
  toggleLabelEdit: PropTypes.func
}

export default LabelDropdownItem
