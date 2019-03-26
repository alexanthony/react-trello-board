import React from 'react'

import { Modal } from 'semantic-ui-react'
import PreferencesModal from './PreferencesModal'
import HeaderButton from './HeaderButton'

class PreferencesButton extends React.PureComponent {
  render() {
    return (
      <Modal trigger={<HeaderButton size="mini" icon="setting" />}>
        <Modal.Header>Preferences</Modal.Header>
        <Modal.Content>
          <PreferencesModal />
        </Modal.Content>
      </Modal>
    )
  }
}

export default PreferencesButton
