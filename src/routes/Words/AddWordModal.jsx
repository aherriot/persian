import React, { Component } from 'react'
import Modal from 'components/Modal'
import WordForm from 'components/WordForm'

import './WordModal.css'

export default class AddWordModal extends Component {
  render() {
    const { open, actions } = this.props

    return (
      <Modal open={open} onClose={actions.closeAddModal} title="Add Word">
        <WordForm
          submitAction={actions.addWord}
          finishedSubmitAction={actions.closeAddModal}
          cancelAction={actions.closeAddModal}
        />
      </Modal>
    )
  }
}
