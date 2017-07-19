import React, { PropTypes } from 'react'
import { Label } from 'semantic-ui-react'
import { labelStyle } from '../../../utils'

const Labels = ({ labels }) =>
  labels.length > 0
    ? <div className="card-labels">
        {labels.map(label =>
          <Label
            key={label.id}
            style={labelStyle(label.colour)}
            className="card-label-tag"
            size="small"
          >
            {label.description}
          </Label>
        )}
      </div>
    : null

Labels.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      colour: PropTypes.string,
      description: PropTypes.string
    })
  )
}

export default Labels
