import React, { Component } from 'react'
import Modal from 'components/Modal'
import WordForm from 'components/WordForm'

export default class AddWordModal extends Component {
  getNotAuthorizedContent = () => {
    return (
      <div className="form">
        <div className="form__body">
          Please sign in or create an account to suggest new words.
        </div>
        <div className="form__button-row">
          <button
            type="button"
            className="button"
            onClick={this.props.actions.closeAddModal}>
            Okay
          </button>
        </div>
      </div>
    )
  }

  render() {
    const { open, actions, auth } = this.props

    return (
      <Modal open={open} onClose={actions.closeAddModal} title="Add Word">
        {auth.token && (
          <WordForm
            submitAction={actions.addWord}
            finishedSubmitAction={actions.closeAddModal}
            cancelAction={actions.closeAddModal}
          />
        )}

        {!auth.token && this.getNotAuthorizedContent()}
      </Modal>
    )
  }
}
