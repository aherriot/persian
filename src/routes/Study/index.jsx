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
    this.props.actions.fetchWords()
    this.props.actions.fetchScores()

    this.props.actions.selectWord()
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
      return <Unauthorized />
    }
  }

  render() {
    return (
      <div className="Study">
        <Header title="Study" />
        <Toolbar actions={this.props.actions} />
        {this.getContent()}
        <OptionsModal {...this.props} />
        <EditWordModal {...this.props} />
        <Status status={this.props.study.status} />
      </div>
    )
  }
}
