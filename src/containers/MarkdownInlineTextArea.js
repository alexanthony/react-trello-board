import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import useInlineEdit from './useInlineEdit'
import styled, { css } from 'styled-components'

const rowsOfText = text => text.split('\n').length
const greaterOfSpecifiedRowsAndRowsOfText = (text, specifiedRows) => {
  const rows = rowsOfText(text)
  return rows > specifiedRows ? rows : specifiedRows
}

const placeholderIfBlank = text =>
  text ? text : 'Click to edit description...'

const text = css`
  width: 100%;
  display: block;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.12);
  font-size: 14px;
  border-radius: 3px;
  min-height: 40px;
  margin: 20px 0;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const TextArea = styled.textarea`
  ${text}
  border: none;
  outline: 0;
  border-radius: 3px;
`

const Text = styled.div`
  ${text}
`

export const MarkdownInlineTextArea = ({
  onChange,
  value,
  autoHeight,
  rows,
  className,
  classNameEditing,
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
      <TextArea
        rows={
          autoHeight ? greaterOfSpecifiedRowsAndRowsOfText(text, rows) : rows
        }
        className={`${className} ${classNameEditing}`}
        value={text}
        onBlur={onFinishEditing}
        onKeyDown={onKeyDown}
        onChange={event => onChangeText(event.target.value)}
        ref={inputEl}
      />
    )
  }
  return (
    <Text className={className} onClick={onStartEditing}>
      <ReactMarkdown
        escapeHtml
        source={placeholderIfBlank(value)}
        onClick={onStartEditing}
      />
    </Text>
  )
}

MarkdownInlineTextArea.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  classNameEditing: PropTypes.string,
  rows: PropTypes.number,
  autoHeight: PropTypes.bool,
}

export default MarkdownInlineTextArea
