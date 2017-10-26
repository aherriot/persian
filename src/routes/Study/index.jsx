import React, { Component } from 'react'
import Header from 'components/Header'

import Toolbar from './Toolbar'
import Question from './Question'
import Answer from './Answer'

import './Study.css'

export default class Study extends Component {
  componentDidMount() {
    this.props.actions.fetchWords()
    this.props.actions.fetchScores()

    // if (!this.props.study.selectWordId) {
    //   this.props.actions.selectWord()
    // }
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.words.fetchStatus === 'SUCCESS' &&
      newProps.scores.fetchStatus === 'SUCCESS' &&
      !newProps.study.selectedWordId
    ) {
      this.props.actions.selectWord()
    }
  }

  render() {
    const { actions, study } = this.props
    return (
      <div className="Study">
        <Header title="Study" />
        <Toolbar actions={actions} />
        {study.isEvaluating ? (
          <Answer {...this.props} />
        ) : (
          <Question {...this.props} />
        )}
      </div>
    )
  }
}
