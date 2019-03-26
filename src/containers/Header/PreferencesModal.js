import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Header, Form } from 'semantic-ui-react'

import { PreferencesActions } from '../../redux/preferences'
import FileUploadInput from '../FileUploadInput'

const PreferencesModal = ({
  onBackgroundImageUpload,
  onClearBackground,
  boardTitle,
  onSetBoardTitle,
}) => (
  <>
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
  </>
)

PreferencesModal.propTypes = {
  onBackgroundImageUpload: PropTypes.func,
  onClearBackground: PropTypes.func,
  onSetBoardTitle: PropTypes.func,
  boardTitle: PropTypes.string,
}

const mapStateToProps = state => ({
  boardTitle: state.preferences.boardTitle,
})

const mapDispatchToProps = dispatch => ({
  onBackgroundImageUpload: image =>
    dispatch(PreferencesActions.setBackgroundImage(image)),
  onClearBackground: () => dispatch(PreferencesActions.clearBackgroundImage()),
  // Lazy - tidy
  onSetBoardTitle: event =>
    dispatch(PreferencesActions.setBoardTitle(event.target.value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreferencesModal)
