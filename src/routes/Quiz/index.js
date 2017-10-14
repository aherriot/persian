import React, { Component } from 'react'
import Header from 'components/Header'

import './Quiz.css'

export default class Quiz extends Component {
  componentDidMount() {
    this.props.actions.fetchWords()
  }

  render() {
    const words = []
    for (let wordId in this.props.words.byId) {
      const word = this.props.words.byId[wordId]
      words.push(word)
    }

    return (
      <div className="Quiz">
        <Header title="Quiz" />
      </div>
    )
  }
}
