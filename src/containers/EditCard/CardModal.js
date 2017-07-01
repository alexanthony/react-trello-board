import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'

import { EditActions } from '../../reducers/edit'

const EditModal = ({ showModal, onHideModal }) =>
  <Modal isOpen={showModal} onRequestClose={onHideModal} />

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
