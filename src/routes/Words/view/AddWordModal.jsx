import React, { PureComponent } from 'react'
import Modal from 'commonComponents/Modal'
import WordForm from 'commonComponents/WordForm'

export default class AddWordModal extends PureComponent {
  render() {
    const { open, actions, role } = this.props
    const isAdmin = role === 'admin'
    return (
      <Modal
        open={open}
        onClose={actions.closeAddModal}
        title={isAdmin ? 'Add Word' : 'Suggest Word'}>
        <WordForm
          submitAction={isAdmin ? actions.addWord : actions.addSuggestion}
          finishedSubmitAction={actions.closeAddModal}
          cancelAction={actions.closeAddModal}
          isAdmin={isAdmin}
        />
      </Modal>
    )
  }
}
