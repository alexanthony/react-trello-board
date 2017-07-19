import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Header from '../Header'
import PreferencesModal from '../PreferencesModal'

const propTypes = {
  children: PropTypes.element.isRequired,
  backgroundImage: PropTypes.string,
  boardTitle: PropTypes.string
}

const BaseContainer = props => {
  const style = {}
  if (props.backgroundImage) {
    style.backgroundImage = `url(${props.backgroundImage})`
    style.backgroundSize = 'cover'
  }

  if (document.title !== props.boardTitle) {
    document.title = props.boardTitle
  }

  return (
    <main style={style}>
      <PreferencesModal />
      <Header boardTitle={props.boardTitle} />
      {props.children}
    </main>
  )
}

BaseContainer.propTypes = propTypes

const mapStateToProps = state => ({
  backgroundImage: state.preferences.background.image,
  boardTitle: state.preferences.boardTitle
})

export default connect(mapStateToProps)(BaseContainer)
