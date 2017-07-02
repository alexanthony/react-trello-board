import React, { PropTypes } from 'react'

const NewListPlaceholder = ({ onAddList }) =>
  <div className="desk-container new-list-placeholder-container">
    <div className="desk new-list-placeholder">
      <div className="desk-head new-list-head">
        <a href="#" onClick={onAddList}>
          Add a list...
        </a>
      </div>
    </div>
  </div>

NewListPlaceholder.propTypes = {
  onAddList: PropTypes.func.isRequired
}

export default NewListPlaceholder
