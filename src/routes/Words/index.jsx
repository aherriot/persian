import React, { Component } from 'react'
import Header from 'components/Header'
import Toolbar from './Toolbar'
import List from './List'

import './Words.css'

export default class Words extends Component {
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
      <div className="Words">
        <Header title="Words" />
        <Toolbar />
        <List words={words} />
      </div>
    )
  }
}
