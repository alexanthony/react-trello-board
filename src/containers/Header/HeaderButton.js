import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const HeaderButton = styled(Button)`
  background-color: rgba(0, 0, 0, 0.12);
  color: rgba(255, 255, 255, 0.7);
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`
export default HeaderButton
