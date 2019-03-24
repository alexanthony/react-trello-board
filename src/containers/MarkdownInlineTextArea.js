import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

const rowsOfText = text => text.split('\n').length
const greaterOfSpecifiedRowsAndRowsOfText = (text, specifiedRows) => {
  const rows = rowsOfText(text)
  return rows > specifiedRows ? rows : specifiedRows
}

const placeholderIfBlank = text =>
  text && text !== '' ? text : 'Click to edit description...'

class MarkdownInlineTextArea extends Component {
  static defaultProps = {
    className: '',
    classNameEditing: '',
    rows: 3,
    autoHeight: true
  }
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    className: PropTypes.string,
    classNameEditing: PropTypes.string,
    rows: PropTypes.number,
    autoHeight: PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.state = { editing: false, text: '' }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ text: nextProps.value })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.editing && !prevState.editing) {
      this.textArea.focus()
    } else if (this.state.editing && prevProps.value !== this.props.value) {
      this.finishEditing()
    }
  }

  onStartEditing = () => {
    this.setState({
      editing: true,
      text: this.props.value
    })
    if (this.textArea) this.textArea.focus()
  }

  onStopEditing = () => {
    this.setState({ editing: false })
    this.finishEditing()
  }

  onChange = event => {
    this.setState({ text: event.target.value })
  }

  onKeyDown = event => {
    if (event.keyCode === 27) {
      // Escape
      this.cancelEditing()
    }
  }

  finishEditing = () => {
    if (this.state.text !== this.props.value) {
      this.props.onChange(this.state.text)
    }
  }

  cancelEditing = () => {
    this.setState({ editing: false, text: this.props.value })
  }

  render() {
    if (this.state.editing) {
      return (
        <textarea
          rows={
            this.props.autoHeight
              ? greaterOfSpecifiedRowsAndRowsOfText(
                  this.state.text,
                  this.props.rows
                )
              : this.props.rows
          }
          className={`${this.props.className} ${this.props.classNameEditing}`}
          value={this.state.text}
          onBlur={this.onStopEditing}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          ref={textArea => {
            this.textArea = textArea
          }}
        />
      )
    }
    return (
      <div className={this.props.className} onClick={this.onStartEditing}>
        <ReactMarkdown
          escapeHtml
          source={placeholderIfBlank(this.props.value)}
          onClick={this.onStartEditing}
        />
      </div>
    )
  }
}

export default MarkdownInlineTextArea
