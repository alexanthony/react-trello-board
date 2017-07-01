import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'

import { EditActions } from '../../reducers/edit'

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

const EditModal = ({ showModal, onHideModal }) =>
  <Modal isOpen={showModal} onRequestClose={onHideModal} style={modalStyle} />

EditModal.propTypes = {
  showModal: PropTypes.bool,
  onHideModal: PropTypes.func
}

const mapStateToProps = state => ({
  showModal: state.edit.editCard !== null
})

const mapDispatchToProps = dispatch => ({
  onHideModal: () => dispatch(EditActions.dismissEditCard())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)
