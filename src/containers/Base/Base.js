import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Header from '../Header'
import PreferencesModal from '../PreferencesModal'

const propTypes = {
  children: PropTypes.element.isRequired,
  backgroundImage: PropTypes.string
}

const BaseContainer = props => {
  const style = {}
  if (props.backgroundImage) {
    style.backgroundImage = `url(${props.backgroundImage})`
    style.backgroundSize = 'cover'
  }

  return (
    <main style={style}>
      <PreferencesModal />
      <Header />
      {props.children}
    </main>
  )
}

BaseContainer.propTypes = propTypes

const mapStateToProps = state => ({
  backgroundImage: state.preferences.background.image
})

export default connect(mapStateToProps)(BaseContainer)
