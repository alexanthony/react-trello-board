import React from 'react'
import useInlineEdit from './useInlineEdit'
import styled, { css } from 'styled-components'

const text = css`
  display: block;
  font-size: 18px;
  ${props => props.small && 'font-size: 14px'};
  ${props => props.bold && 'font-weight: bold'};
  padding: 5px;
  width: 100%;
`

const Input = styled.input`
  ${text}
  border: none;
  outline: 0;
  border-radius: 3px;
  min-height: 18px;
  padding-bottom: 2px;
  ${props => props.background && `background: ${props.background}`};
`

const Text = styled.span`
  ${text}
`

const InlineTextEdit = ({
  onChange,
  value,
  small,
  bold,
  editingBackground,
}) => {
  const {
    onChangeText,
    onFinishEditing,
    onStartEditing,
    inputEl,
    text,
    editing,
    onKeyDown,
  } = useInlineEdit(value, onChange)

  if (editing) {
    return (
      <Input
        ref={inputEl}
        value={text}
        onChange={event => onChangeText(event.target.value)}
        onBlur={onFinishEditing}
        onKeyDown={onKeyDown}
        small={small}
        bold={bold}
        background={editingBackground}
      />
    )
  } else {
    return (
      <Text onClick={onStartEditing} small={small} bold={bold}>
        {value}
      </Text>
    )
  }
}

export default InlineTextEdit
