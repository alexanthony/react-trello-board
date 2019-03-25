import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Header from '../Header'
import PreferencesModal from '../PreferencesModal'

const Main = styled.main`
  ${props =>
    props.backgroundImage &&
    `
    background-image: url(${props.backgroundImage});
    background-size: cover;
  `}
`

const propTypes = {
  children: PropTypes.element.isRequired,
  backgroundImage: PropTypes.string,
  boardTitle: PropTypes.string,
}

const BaseContainer = props => {
  const style = {}
  if (props.backgroundImage) {
    style.backgroundImage = `url(${props.backgroundImage})`
    style.backgroundSize = 'cover'
  }

  // Naughty - side effect in render...
  if (document.title !== props.boardTitle) {
    document.title = props.boardTitle
  }

  return (
    <Main backgroundImage={props.backgroundImage}>
      <PreferencesModal />
      <Header boardTitle={props.boardTitle} />
      {props.children}
    </Main>
  )
}

BaseContainer.propTypes = propTypes

const mapStateToProps = state => ({
  backgroundImage: state.preferences.background.image,
  boardTitle: state.preferences.boardTitle,
})

export default connect(mapStateToProps)(BaseContainer)
