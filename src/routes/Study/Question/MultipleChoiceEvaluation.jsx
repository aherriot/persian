import React, { Component } from 'react'

import './MultipleChoiceEvaluation.css'

export default class MultipleChoiceEvaluation extends Component {
  generateChoice = (wordIds, usedIds) => {
    const { study, words } = this.props
    let choice
    while (!choice) {
      const choiceIndex = Math.floor(Math.random() * wordIds.length)
      const choiceWord = words.byId[wordIds[choiceIndex]]
      if (!usedIds[choiceWord._id]) {
        usedIds[choiceWord._id] = true
        choice = choiceWord[study.options.answerSide]
      }
    }
    this.choices.push({ text: choice, correct: false })
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
    // else mark it as wrong, so the score is reset to 0

    const direction =
      this.props.study.options.questionSide === 'english'
        ? 'fromEnglish'
        : 'fromPersian'
    this.props.actions.markWrong(this.props.study.selectedWordId, direction)
  }

  render() {
    const { study, words } = this.props
    const correctWord = words.byId[study.selectedWordId]

    this.choices = []

    const wordIds = Object.keys(words.byId)
    const usedIds = { [study.selectedWordId]: true }

    // choose 8 or fewer possible answer to show
    const numOfChoices = Math.min(8, wordIds.length)

    const correctIndex = Math.floor(Math.random() * numOfChoices)
    for (let i = 0; i < numOfChoices; i++) {
      if (i === correctIndex) {
        this.choices.push({
          text: correctWord[study.options.answerSide],
          correct: true
        })
      } else {
        this.generateChoice(wordIds, usedIds)
      }
    }

    return (
      <div className="MultpleChoice">
        {this.choices.map((choice, index) => (
          <div
            key={index}
            className="MultpleChoice__choice"
            onClick={choice.correct ? this.onCorrect : this.onWrong}>
            {choice.text}
          </div>
        ))}
      </div>
    )
  }
}
