import React, { PropTypes } from 'react'

import Header from '../Header'
import PreferencesModal from '../PreferencesModal'

const propTypes = {
  children: PropTypes.element.isRequired
}

const BaseContainer = props =>
  <main>
    <PreferencesModal />
    <Header />
    {props.children}
  </main>

BaseContainer.propTypes = propTypes

export default BaseContainer
