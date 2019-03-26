import { useState, useRef, useEffect, useCallback } from 'react'

const useInlineEdit = (value, onChange) => {
  const [editing, setEditing] = useState(false)
  const [text, onChangeText] = useState(value)
  const inputEl = useRef(null)

  // When we start editing, focus the input
  useEffect(() => {
    if (inputEl.current && editing) {
      inputEl.current.focus()
    }
  }, [editing])

  // When we stop editing, trigger onChange
  const onFinishEditing = useCallback(() => {
    setEditing(false)
    onChange(text)
  }, [text, setEditing, onChange])

  // When the text is clicked, start editing
  const onStartEditing = useCallback(() => {
    setEditing(true)
  }, [setEditing])

  // Cancel on Esc
  const onKeyDown = useCallback(
    event => {
      // Esc
      if (event.keyCode === 27) {
        event.stopPropagation()
        onChangeText(value)
        setEditing(false)
      }
    },
    [onChangeText, value, setEditing]
  )
  return {
    onChangeText,
    onFinishEditing,
    onStartEditing,
    inputEl,
    text,
    editing,
    onKeyDown,
  }
}

export default useInlineEdit
