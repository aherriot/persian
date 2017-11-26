import React, { Component } from 'react'
import Modal from 'components/Modal'
import WordForm from 'components/WordForm'

export default class AddWordModal extends Component {
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
