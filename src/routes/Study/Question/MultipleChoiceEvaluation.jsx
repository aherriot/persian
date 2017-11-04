import React, { Component } from 'react'

import './MultipleChoiceEvaluation.css'

export default class MultipleChoiceEvaluation extends Component {
  constructor(props) {
    super(props)

    this.state = { choices: this.getChoices(props.words, props.study) }
  }

  getChoices = (words, study) => {
    // initially populate the choices array with the correct answer
    const choices = [{ wordId: study.selectedWordId, correct: true }]
    const usedWords = { [study.selectedWordId]: true }

    let wordIds
    if (study.options.tagFilter) {
      wordIds = words.byTag[study.options.tagFilter]

      // if we have 8 or less words in this category,
      if (wordIds.length <= 8) {
        // then we add them all
        for (let i = 0; i < wordIds.length; i++) {
          if (!usedWords[wordIds[i]]) {
            choices.push({ wordId: wordIds[i], correct: false })
            usedWords[wordIds[i]] = true
          }
        }

        // we have to now fill the remaining words
        // with other words, not in the category
        const otherWordIds = Object.keys(words.byId)
        while (choices.length < 8) {
          const choiceIndex = Math.floor(Math.random() * otherWordIds.length)
          const choiceId = otherWordIds[choiceIndex]
          // only add it if it hasn;t been used yet
          if (!usedWords[choiceId]) {
            choices.push({ wordId: choiceId, correct: false })
            usedWords[choiceId] = true
          }
        }

        // else, we randomly add a subset
      } else {
        while (choices.length < 8) {
          const choiceIndex = Math.floor(Math.random() * wordIds.length)
          const choiceId = wordIds[choiceIndex]
          // only add it if it hasn;t been used yet
          if (!usedWords[choiceId]) {
            choices.push({ wordId: choiceId, correct: false })
            usedWords[choiceId] = true
          }
        }
      }

      // else, if we are selecting from all the words
    } else {
      wordIds = Object.keys(words.byId)

      if (wordIds.length < 8) {
        // then we add them all
        for (let i = 0; i < wordIds.length; i++) {
          if (!usedWords[wordIds[i]]) {
            choices.push({ wordId: wordIds[i], correct: false })
            usedWords[wordIds[i]] = true
          }
        }
      } else {
        // we have more than 8 cards, so we randomly add a subset
        while (choices.length < 8) {
          const choiceIndex = Math.floor(Math.random() * wordIds.length)
          const choiceId = wordIds[choiceIndex]
          // only add it if it hasn;t been used yet
          if (!usedWords[choiceId]) {
            choices.push({ wordId: choiceId, correct: false })
            usedWords[choiceId] = true
          }
        }
      }
    }

    return this.shuffle(choices)
  }

  // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  shuffle(array) {
    let counter = array.length

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter)

      // Decrease counter by 1
      counter--

      // And swap the last element with it
      let temp = array[counter]
      array[counter] = array[index]
      array[index] = temp
    }

    return array
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
    // mark it as wrong, so the score is reset to 0

    const direction =
      this.props.study.options.questionSide === 'english'
        ? 'fromEnglish'
        : 'fromPersian'
    this.props.actions.markWrong(this.props.study.selectedWordId, direction)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.study.selectedWordId !== newProps.study.selectedWordId) {
      this.setState({
        choices: this.getChoices(newProps.words, newProps.study)
      })
    }
  }

  render() {
    const { words, study } = this.props
    return (
      <div className="MultpleChoice">
        {this.state.choices.map((choice, index) => (
          <div
            key={index}
            className="MultpleChoice__choice"
            onClick={choice.correct ? this.onCorrect : this.onWrong}>
            {words.byId[choice.wordId][study.options.answerSide]}
          </div>
        ))}
      </div>
    )
  }
}
