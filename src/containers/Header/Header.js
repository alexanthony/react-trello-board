import React from 'react'
import PropTypes from 'prop-types'
import { Header as SemanticHeader } from 'semantic-ui-react'
import styled from 'styled-components'
import PreferencesButton from './PreferencesButton'

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.12);
  height: 40px;
  padding: 5px;
`

const HeaderGroup = styled.div``

const HeaderText = styled(SemanticHeader)`
  &&& {
    color: rgba(255, 255, 255, 0.7);
    margin-top: 5px;
  }
`

const Header = ({ boardTitle }) => (
  <BoardHeader>
    <HeaderGroup />
    <HeaderGroup>
      <HeaderText>{boardTitle}</HeaderText>
    </HeaderGroup>
    <HeaderGroup>
      <PreferencesButton />
    </HeaderGroup>
  </BoardHeader>
)

Header.propTypes = {
  boardTitle: PropTypes.string,
}

export default Header
