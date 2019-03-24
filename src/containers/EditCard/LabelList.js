import React from 'react'
import PropTypes from 'prop-types'
import { RIEInput } from 'riek'

import LabelDropdownItem from './LabelDropdownItem'

const LabelList = ({
  labelTypes,
  selectedCardLabels,
  toggleLabel,
  toggleLabelEdit,
  addLabelType,
  style
}) =>
  <div style={style}>
    {labelTypes.map(labelType =>
      <LabelDropdownItem
        key={labelType.id}
        labelType={labelType}
        toggleLabel={toggleLabel}
        toggleLabelEdit={toggleLabelEdit}
        selected={
          selectedCardLabels.findIndex(label => label.id === labelType.id) !==
          -1
        }
      />
    )}
    <div className="add-label-container">
      <RIEInput
        value="Add a label"
        propName="description"
        change={addLabelType}
        className="add-label"
        classEditing="add-label-editing"
      />
    </div>
  </div>

LabelList.propTypes = {
  labelTypes: PropTypes.array,
  selectedCardLabels: PropTypes.array,
  toggleLabel: PropTypes.func,
  toggleLabelEdit: PropTypes.func,
  addLabelType: PropTypes.func,
  style: PropTypes.object
}

export default LabelList
