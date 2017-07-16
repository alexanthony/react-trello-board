import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { UIActions, Modals } from '../redux/ui'

const Header = ({ showPreferences }) =>
  <div className="header">
    <Button
      className="header-button"
      onClick={showPreferences}
      size="mini"
      icon="setting"
    />
  </div>

Header.propTypes = {
  showPreferences: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  showPreferences: () => dispatch(UIActions.setModal(Modals.PREFERENCES))
})

export default connect(null, mapDispatchToProps)(Header)
