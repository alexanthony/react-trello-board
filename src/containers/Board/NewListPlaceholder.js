import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import ListContainer from './ListContainer'

const NewListContainer = styled(ListContainer)`
  background-color: rgba(0, 0, 0, 0.12);
  min-height: 30px;
  box-shadow: none;

  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  & a {
    color: rgba(255, 255, 255, 0.7);
  }
  &:hover a {
    color: rgba(255, 255, 255, 0.8);
  }
`
const NewListLink = styled.a`
  padding: 10px;
`

const NewListPlaceholder = ({ onAddList }) => (
  <NewListContainer onClick={onAddList}>
    <NewListLink href="#">Add a list...</NewListLink>
  </NewListContainer>
)

NewListPlaceholder.propTypes = {
  onAddList: PropTypes.func.isRequired,
}

export default NewListPlaceholder
