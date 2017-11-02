import React, { Component } from 'react'
import Header from 'components/Header'

import Toolbar from './Toolbar'
import Question from './Question'
import Answer from './Answer'
import Unauthorized from './Unauthorized'

import OptionsModal from './OptionsModal'

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

  getContent() {
    const { actions, study, auth } = this.props
    if (auth.token) {
      if (study.isEvaluating) {
        return [
          <Toolbar key="toolbar" actions={actions} />,
          <div key="answer" className="content">
            <Answer {...this.props} />
          </div>
        ]
      } else {
        return [
          <Toolbar key="toolbar" actions={actions} />,
          <div key="question" className="content">
            <Question {...this.props} />
          </div>
        ]
      }
    } else {
      return (
        <div className="content">
          <Unauthorized />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="Study">
        <Header title="Study" />
        {this.getContent()}
        <OptionsModal {...this.props} />
      </div>
    )
  }
}
