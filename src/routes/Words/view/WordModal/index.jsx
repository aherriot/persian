import React, { PureComponent } from 'react'
import Modal from 'components/Modal'
import WordForm from 'components/WordForm'
import WordDetails from './WordDetails'

export default class WordModal extends PureComponent {
  getEditForm() {
    const { actions, words, selectedWordId, auth } = this.props
    return (
      <WordForm
        submitAction={actions.updateWord}
        finishedSubmitAction={actions.deselectWord}
        cancelAction={actions.cancelEditWord}
        word={words.byId[selectedWordId]}
        isAdmin={auth.role === 'admin'}
      />
    )
  }

  getConfirmDelete() {
    const { actions, words, selectedWordId } = this.props
    const word = words.byId[selectedWordId]

    if (!word) return null

    return (
      <div className="form">
        <div className="form__body">
          <p>
            Are you sure you want to delete {word.english} / {word.persian}?
          </p>
        </div>
        <div className="form__button-row">
          <button
            className="button secondary"
            onClick={actions.dismissDeleteWord}>
            No
          </button>
          <div className="button-spacer" />
          <button className="button" onClick={() => actions.deleteWord(word)}>
            Yes
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {
      open,
      actions,
      editingWord,
      confirmingDelete,
      words,
      scores,
      selectedWordId,
      auth: { role }
    } = this.props

    let content, title
    if (confirmingDelete) {
      title = 'Confirm Delete'
      content = this.getConfirmDelete()
    } else if (editingWord) {
      title = 'Edit Word'
      content = this.getEditForm()
    } else {
      title = 'Details'
      content = (
        <WordDetails
          actions={actions}
          words={words}
          scores={scores}
          selectedWordId={selectedWordId}
          role={role}
        />
      )
    }

    return (
      <Modal open={open} onClose={actions.deselectWord} title={title}>
        {content}
      </Modal>
    )
  }
}
