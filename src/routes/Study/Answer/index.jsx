import React, { Component } from 'react'
import thirdSide from 'utils/thirdSide'
import './Answer.css'

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
      <div className={study.wasCorrect ? 'Answer--correct' : 'Answer--wrong'}>
        {study.wasCorrect && <div className="Answer__correct">Correct!</div>}
        {!study.wasCorrect && <div className="Answer__wrong">Wrong!</div>}
        <div className="Answer__answerSide">
          {word[study.options.answerSide]}
        </div>
        <div className="Answer__questionSide">
          {word[study.options.questionSide]} /{' '}
          {
            word[
              thirdSide(study.options.questionSide, study.options.answerSide)
            ]
          }
        </div>
        <div className="form__button-row ">
          {!study.wasCorrect && (
            <button
              className="button"
              type="button"
              onClick={actions.undoMarkWrong}>
              Undo Mark Wrong
            </button>
          )}
          <button
            type="button"
            className="button"
            ref={button => {
              this.continueButton = button
            }}
            onClick={this.onContinue}>
            Continue
          </button>
        </div>
      </div>
    )
  }
}
