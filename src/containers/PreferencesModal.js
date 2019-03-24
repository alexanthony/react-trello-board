import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Button, Header, Form } from 'semantic-ui-react'

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
  onClearBackground,
  boardTitle,
  onSetBoardTitle
}) =>
  <Modal isOpen={showModal} onRequestClose={onHideModal} style={modalStyle}>
    <Header>Preferences</Header>
    <Header size="small">Board</Header>
    <Form>
      <Form.Field>
        <label>Title</label>
        <input value={boardTitle} onChange={onSetBoardTitle} />
      </Form.Field>
    </Form>
    <Header size="small">Background</Header>
    <FileUploadInput onFileUpload={onBackgroundImageUpload} />
    <Button onClick={onClearBackground}>Clear</Button>
  </Modal>

PreferencesModal.propTypes = {
  showModal: PropTypes.bool,
  onHideModal: PropTypes.func,
  onBackgroundImageUpload: PropTypes.func,
  onClearBackground: PropTypes.func,
  onSetBoardTitle: PropTypes.func,
  boardTitle: PropTypes.string
}

const mapStateToProps = state => ({
  showModal: state.ui === Modals.PREFERENCES,
  boardTitle: state.preferences.boardTitle
})

const mapDispatchToProps = dispatch => ({
  onHideModal: () => dispatch(UIActions.dismissModal()),
  onBackgroundImageUpload: image =>
    dispatch(PreferencesActions.setBackgroundImage(image)),
  onClearBackground: () => dispatch(PreferencesActions.clearBackgroundImage()),
  // Lazy - tidy
  onSetBoardTitle: event =>
    dispatch(PreferencesActions.setBoardTitle(event.target.value))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesModal)
