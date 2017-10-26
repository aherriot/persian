import React, { Component } from 'react'
import checkAnswer from 'utils/checkAnswer'

export default class TextEvaluation extends Component {
  onSubmit = e => {
    if (this.input.value.length > 0) {
      const { words, study } = this.props
      const word = words.byId[study.selectedWordId]
      const answer = word[study.options.answerSide]

      if (checkAnswer(this.input.value, answer)) {
        this.props.actions.markCorrect()
      } else {
        this.props.actions.markWrong()
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
      <div>
        <input
          type="text"
          ref={input => (this.input = input)}
          onKeyDown={this.onKeyDown}
        />
        <button type="button" onClick={this.onSubmit}>
          Check
        </button>
      </div>
    )
  }
}
