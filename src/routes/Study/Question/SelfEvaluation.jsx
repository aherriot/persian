import React, { Component } from 'react'

// import './SelfEvaluation.css'

export default class SelfEvaluation extends Component {
  constructor(props) {
    super(props)

    this.state = { revealAnswer: false }
  }

  onRevealAnswer = () => {
    this.setState({ revealAnswer: true })
  }

  onCorrect = e => {
    const { actions, scores, study } = this.props

    const direction =
      study.options.questionSide === 'english' ? 'fromEnglish' : 'fromPersian'

    const score = scores.byWordId[study.selectedWordId]
    let newScore = 1

    if (score && score[direction]) {
      newScore = score[direction].score + 1
    }

    actions.markCorrect(study.selectedWordId, direction, newScore)
  }

  onWrong = e => {
    //  mark it as wrong, so the score is reset to 0
    const direction =
      this.props.study.options.questionSide === 'english'
        ? 'fromEnglish'
        : 'fromPersian'
    this.props.actions.markWrong(this.props.study.selectedWordId, direction)
  }

  render() {
    const correctWord = this.props.words.byId[this.props.study.selectedWordId]

    return (
      <div className="SelfEvaluation">
        {!this.state.revealAnswer && (
          <div className="SelfEvaluation__reveal-answer">
            <button className="button" onClick={this.onRevealAnswer}>
              Reveal Answer
            </button>
          </div>
        )}

        {this.state.revealAnswer && (
          <div className="SelfEvaluation__answer">
            <div>{correctWord[this.props.study.options.answerSide]}</div>
            <button type="button" className="button" onClick={this.onCorrect}>
              Correct
            </button>
            <button type="button" className="button" onClick={this.onWrong}>
              Wrong
            </button>
          </div>
        )}
      </div>
    )
  }
}
