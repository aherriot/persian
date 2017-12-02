import React, { Component } from 'react'
import checkAnswer from 'utils/checkAnswer'

import './TextEvaluation.css'

export default class TextEvaluation extends Component {
  onSubmit = e => {
    const { actions, words, scores, study } = this.props

    if (this.input.value.length > 0) {
      const word = words.byId[study.selectedWordId]
      const answer = word[study.options.answerSide]
      const direction =
        study.options.questionSide === 'english' ? 'fromEnglish' : 'fromPersian'

      // check if the user got the right answer
      if (checkAnswer(this.input.value, answer)) {
        // determine new score
        const score = scores.byWordId[study.selectedWordId]
        let newScore = 1
        if (score && score[direction]) {
          newScore = score[direction].score + 1
        }

        actions.markCorrect(study.selectedWordId, direction, newScore)
      } else {
        // else mark it as wrong, so the score is reset to 0
        actions.markWrong(study.selectedWordId, direction)
      }
    }
  }

  onKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.onSubmit(e)
    }
  }

  componentDidMount() {
    this.input.focus()
  }

  render() {
    return (
      <div className="TextEvaluation">
        <input
          type="text"
          ref={input => (this.input = input)}
          onKeyDown={this.onKeyDown}
        />
        <button type="button" className="button" onClick={this.onSubmit}>
          Check
        </button>
      </div>
    )
  }
}
