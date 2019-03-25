import styled from 'styled-components'

const ListContainer = styled.div`
  background-color: #e2e4e6;
  margin-right: 10px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  max-height: 100%;
  width: 270px;
  flex-shrink: 0;
  &:first-child {
    margin-left: 10px;
  }
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`
export default ListContainer
