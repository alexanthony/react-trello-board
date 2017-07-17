import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Button, Header } from 'semantic-ui-react'

import { UIActions, Modals } from '../redux/ui'
import { PreferencesActions } from '../redux/preferences'
import FileUploadInput from './FileUploadInput'

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  content: {
    left: '30%',
    right: '30%',
    bottom: '30%',
    backgroundColor: '#edeff0'
  }
}

const PreferencesModal = ({
  showModal,
  onHideModal,
  onBackgroundImageUpload,
  onClearBackground
}) =>
  <Modal isOpen={showModal} onRequestClose={onHideModal} style={modalStyle}>
    <Header>Preferences</Header>
    <Header size="small">Background Image</Header>
    <FileUploadInput onFileUpload={onBackgroundImageUpload} />
    <Button onClick={onClearBackground}>Clear</Button>
  </Modal>

PreferencesModal.propTypes = {
  showModal: PropTypes.bool,
  onHideModal: PropTypes.func,
  onBackgroundImageUpload: PropTypes.func,
  onClearBackground: PropTypes.func
}

const mapStateToProps = state => ({
  showModal: state.ui === Modals.PREFERENCES
})

const mapDispatchToProps = dispatch => ({
  onHideModal: () => dispatch(UIActions.dismissModal()),
  onBackgroundImageUpload: image =>
    dispatch(PreferencesActions.setBackgroundImage(image)),
  onClearBackground: () => dispatch(PreferencesActions.clearBackgroundImage())
})

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesModal)
