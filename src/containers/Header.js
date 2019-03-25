import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Header as SemanticHeader } from 'semantic-ui-react'
import styled from 'styled-components'

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.12);
  height: 40px;
  padding: 5px;
`

const HeaderGroup = styled.div``

const HeaderButton = styled(Button)`
  background-color: rgba(0, 0, 0, 0.12);
  color: rgba(255, 255, 255, 0.7);
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const HeaderText = styled(SemanticHeader)`
  &&& {
    color: rgba(255, 255, 255, 0.7);
    margin-top: 5px;
  }
`

import { UIActions, Modals } from '../redux/ui'

const Header = ({ showPreferences, boardTitle }) => (
  <BoardHeader>
    <HeaderGroup />
    <HeaderGroup>
      <HeaderText>{boardTitle}</HeaderText>
    </HeaderGroup>
    <HeaderGroup>
      <HeaderButton onClick={showPreferences} size="mini" icon="setting" />
    </HeaderGroup>
  </BoardHeader>
)

Header.propTypes = {
  showPreferences: PropTypes.func,
  boardTitle: PropTypes.string,
}

const mapDispatchToProps = dispatch => ({
  showPreferences: () => dispatch(UIActions.setModal(Modals.PREFERENCES)),
})

export default connect(
  null,
  mapDispatchToProps
)(Header)
