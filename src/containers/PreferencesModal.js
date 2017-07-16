import React, { PropTypes, Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { RIEInput, RIETextArea } from 'riek'
import { Button, Popup } from 'semantic-ui-react'

import { UIActions, Modals } from '../redux/ui'

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

const PreferencesModal = ({ showModal, onHideModal }) =>
  <Modal isOpen={showModal} onRequestClose={onHideModal} style={modalStyle}>
    PreferencesModal
  </Modal>

PreferencesModal.propTypes = {
  showModal: PropTypes.bool,
  onHideModal: PropTypes.func
}

const mapStateToProps = state => ({
  showModal: state.ui === Modals.PREFERENCES
})

const mapDispatchToProps = dispatch => ({
  onHideModal: () => dispatch(UIActions.dismissModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesModal)
