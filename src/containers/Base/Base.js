import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Header from '../Header/Header'
import SplitterLayout from 'react-splitter-layout'
import 'react-splitter-layout/lib/index.css'
import CardEditForm from '../EditCard/CardEditForm'

const Main = styled.main`
  ${props =>
    props.backgroundImage &&
    `
    background-image: url(${props.backgroundImage});
    background-size: cover;
  `}
`

const SplitterContainer = styled.div`
  position: relative;
  height: 100%;
`

const propTypes = {
  children: PropTypes.element.isRequired,
  backgroundImage: PropTypes.string,
  boardTitle: PropTypes.string,
  showCardEdit: PropTypes.bool,
}

const BaseContainer = props => {
  // Naughty - side effect in render...
  if (document.title !== props.boardTitle) {
    document.title = props.boardTitle
  }

  return (
    <Main backgroundImage={props.backgroundImage}>
      <Header boardTitle={props.boardTitle} />
      <SplitterContainer>
        <SplitterLayout percentage secondaryInitialSize={30}>
          {props.children}
          {props.showCardEdit ? <CardEditForm /> : null}
        </SplitterLayout>
      </SplitterContainer>
    </Main>
  )
}

BaseContainer.propTypes = propTypes

const mapStateToProps = state => ({
  backgroundImage: state.preferences.background.image,
  boardTitle: state.preferences.boardTitle,
  showCardEdit: state.edit.editCard !== null,
})

export default connect(mapStateToProps)(BaseContainer)
