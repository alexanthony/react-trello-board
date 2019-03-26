import React from 'react'
import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'
import { labelStyleCss } from '../../../utils'
import styled from 'styled-components'

const CardLabels = styled.div`
  margin: 0 3px 5px 3px;
  min-height: 30px;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 3px;
`

const CardLabel = styled(Label)`
  ${labelStyleCss}
  &&& {
    margin: 2px;
  }
`

const Labels = ({ labels = [] }) =>
  labels.length > 0 ? (
    <CardLabels>
      {labels.map(label => (
        <CardLabel key={label.id} colour={label.colour} size="small">
          {label.description}
        </CardLabel>
      ))}
    </CardLabels>
  ) : null

Labels.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      colour: PropTypes.string,
      description: PropTypes.string,
    })
  ),
}

export default Labels
