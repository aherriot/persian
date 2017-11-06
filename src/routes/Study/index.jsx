import React, { Component } from 'react'
import Header from 'components/Header'

import Toolbar from './Toolbar'
import Question from './Question'
import Answer from './Answer'
import Unauthorized from './Unauthorized'

import OptionsModal from './OptionsModal'
import EditWordModal from './EditWordModal'
import Status from './Status'

import './Study.css'

export default class Study extends Component {
  componentDidMount() {
    const { actions, scores, words, auth } = this.props
    if (
      auth.token &&
      (scores.fetchStatus === 'INIT' || scores.fetchStatus === 'ERROR')
    ) {
      actions.fetchScores()
    }

    if (words.fetchStatus === 'INIT' || words.fetchStatus === 'ERROR') {
      actions.fetchWords()
    }

    actions.selectWord()
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

  getContent() {
    const { study, auth } = this.props
    if (auth.token) {
      if (study.isEvaluating) {
        return <Answer {...this.props} />
      } else {
        return <Question {...this.props} />
      }
    } else {
      return <Unauthorized actions={this.props.actions} />
    }
  }

  render() {
    return (
      <div className="Study">
        <Header title="Study" />
        {this.props.auth.token && <Toolbar actions={this.props.actions} />}
        {this.getContent()}
        <OptionsModal {...this.props} />
        <EditWordModal {...this.props} />
        <Status status={this.props.study.status} />
      </div>
    )
  }
}
