import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { labelStyleCss } from '../../utils'

const LabelDropdownItemWrapper = styled.div`
  margin-bottom: 10px;
`

const LabelDescription = styled.input`
  ${labelStyleCss};
  width: 150px;
  border-radius: 3px;
  min-height: 25px;
  display: inline-block;
  padding: 10px;
  border: none;
  text-align: left;
  font-weight: bold;
  & a {
    width: 20px;
    display: inline;
  }
`

const LabelActions = styled.div`
  display: inline-block;
  margin-left: 10px;
`

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
      <LabelDropdownItemWrapper>
        <LabelDescription
          type="button"
          colour={labelType.colour}
          onClick={this.toggleLabel}
          value={labelType.description}
        />
        <LabelActions>
          <Button
            icon="checkmark"
            circular
            positive={selected}
            onClick={this.toggleLabel}
          />
          <Button icon="write" circular primary onClick={this.toggleEdit} />
        </LabelActions>
      </LabelDropdownItemWrapper>
    )
  }
}

LabelDropdownItem.propTypes = {
  labelType: PropTypes.object,
  toggleLabel: PropTypes.func,
  selected: PropTypes.bool,
  toggleLabelEdit: PropTypes.func,
}

export default LabelDropdownItem
