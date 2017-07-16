import React, { PropTypes, Component } from 'react'

// Input which sends the file as a base64 string to the callback
class FileUploadInput extends Component {
  static propTypes = {
    onFileUpload: PropTypes.func
  }
  onFileChange = event => {
    const reader = new FileReader()
    reader.onloadend = () => {
      this.props.onFileUpload(reader.result)
    }
    reader.readAsDataURL(event.target.files[0])
  }

  render() {
    return <input type="file" onChange={this.onFileChange} />
  }
}

export default FileUploadInput
