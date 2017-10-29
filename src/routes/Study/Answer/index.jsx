import React, { Component } from 'react'

export default class Answer extends Component {
  componentDidMount() {
    this.continueButton.focus()
  }

  onContinue = e => {
    this.props.actions.selectWord()
  }

  render() {
    const { actions, study, words } = this.props
    const word = words.byId[study.selectedWordId]
    return (
      <div>
        {study.wasCorrect && <div>Correct!</div>}
        {!study.wasCorrect && <div>Wrong!</div>}
        <div>{word[study.options.answerSide]}</div>
        <div>{word[study.options.questionSide]}</div>

        <button
          type="button"
          className="button"
          ref={button => {
            this.continueButton = button
          }}
          onClick={this.onContinue}>
          Continue
        </button>
        <button
          className="button"
          type="button"
          onClick={actions.undoMarkWrong}>
          Undo Mark Wrong
        </button>
      </div>
    )
  }
}
