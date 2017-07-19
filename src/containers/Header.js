import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Header as SemanticHeader } from 'semantic-ui-react'

import { UIActions, Modals } from '../redux/ui'

const Header = ({ showPreferences, boardTitle }) =>
  <div className="board-header">
    <div className="header-group-left" />
    <div className="header-group-center">
      <SemanticHeader className="header-board-title">
        {boardTitle}
      </SemanticHeader>
    </div>
    <div className="header-group-right">
      <Button
        className="header-button"
        onClick={showPreferences}
        size="mini"
        icon="setting"
      />
    </div>
  </div>

Header.propTypes = {
  showPreferences: PropTypes.func,
  boardTitle: PropTypes.string
}

const mapDispatchToProps = dispatch => ({
  showPreferences: () => dispatch(UIActions.setModal(Modals.PREFERENCES))
})

export default connect(null, mapDispatchToProps)(Header)
