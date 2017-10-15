import React, { Component } from 'react'
import Header from 'components/Header'

import './Study.css'

export default class Study extends Component {
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
      <div className="Study">
        <Header title="Study" />
        <div>Study</div>
      </div>
    )
  }
}
