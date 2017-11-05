import React, { Component } from 'react'
import Modal from 'components/Modal'
import WordForm from 'components/WordForm'

import './WordModal.css'

export default class WordModal extends Component {
  getReadOnly() {
    const { actions, words, scores, selectedWordId } = this.props

    let fromEnglishScore = '-'
    let fromPersianScore = '-'

    const word = words.byId[selectedWordId]
    if (word) {
      const scoreForWord = scores.byWordId[selectedWordId]

      if (scoreForWord && scoreForWord.fromEnglish) {
        fromEnglishScore = scoreForWord.fromEnglish.score + ' / 5'
      }

      if (scoreForWord && scoreForWord.fromPersian) {
        fromPersianScore = scoreForWord.fromPersian.score + ' / 5'
      }
    }

    return (
      <div className="form">
        <div className="form__body">
          <label>Persian</label>
          <div className="form__text">{word && word.persian}</div>

          <label>English</label>
          <div className="form__text">{word && word.english}</div>

          <label>Phonetic Persian</label>
          <div className="form__text">{word && word.phonetic}</div>

          <label>Categories</label>
          <div className="form__text">{word && word.tags.join(', ')}</div>

          <label>Score from English</label>
          <div className="form__text">{fromEnglishScore}</div>

          <label>Score from Persian</label>
          <div className="form__text">{fromPersianScore}</div>
        </div>
        <div className="form__button-row">
          <button className="button" onClick={actions.confirmDeleteWord}>
            Delete
          </button>
          <button className="button" onClick={actions.editWord}>
            Edit
          </button>
        </div>
      </div>
    )
  }

  getEditForm() {
    const { actions, words, selectedWordId } = this.props
    return (
      <WordForm
        submitAction={actions.updateWord}
        finishedSubmitAction={actions.deselectWord}
        cancelAction={actions.cancelEditWord}
        word={words.byId[selectedWordId]}
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
          <button className="button" onClick={actions.dismissDeleteWord}>
            No
          </button>
          <button className="button" onClick={() => actions.deleteWord(word)}>
            Yes
          </button>
        </div>
      </div>
    )
  }

  render() {
    const { open, actions, editingWord, confirmingDelete } = this.props

    let content, title
    if (confirmingDelete) {
      title = 'Confirm Delete'
      content = this.getConfirmDelete()
    } else if (editingWord) {
      title = 'Edit Word'
      content = this.getEditForm()
    } else {
      title = 'Details'
      content = this.getReadOnly()
    }

    return (
      <Modal open={open} onClose={actions.deselectWord} title={title}>
        {content}
      </Modal>
    )
  }
}
