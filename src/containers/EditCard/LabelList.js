import React from 'react'
import PropTypes from 'prop-types'
import InlineTextEdit from '../InlineTextEdit'
import styled from 'styled-components'
import LabelDropdownItem from './LabelDropdownItem'

const LabelListWrapper = styled.div`
  display: ${props => (props.editing ? 'none' : 'block')};
`

const AddLabelWrapper = styled.div`
  padding-top: 5px;
`

const LabelList = ({
  labelTypes,
  selectedCardLabels,
  toggleLabel,
  toggleLabelEdit,
  addLabelType,
  editing,
}) => (
  <LabelListWrapper editing={editing}>
    {labelTypes.map(labelType => (
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
    ))}
    <AddLabelWrapper>
      <InlineTextEdit
        value="Add a label"
        onChange={addLabelType}
        small
        editingBackground="rgba(0, 0, 0, 0.12)"
      />
    </AddLabelWrapper>
  </LabelListWrapper>
)

LabelList.propTypes = {
  labelTypes: PropTypes.array,
  selectedCardLabels: PropTypes.array,
  toggleLabel: PropTypes.func,
  toggleLabelEdit: PropTypes.func,
  addLabelType: PropTypes.func,
  editing: PropTypes.bool,
}

export default LabelList
