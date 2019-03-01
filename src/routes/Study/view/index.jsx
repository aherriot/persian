import React, { Fragment, PureComponent } from 'react'
import Header from 'components/Header'

import Toolbar from './Toolbar'
import Question from './Question'
import Answer from './Answer'
import Unauthorized from './Unauthorized'

import OptionsModal from './OptionsModal'
import EditWordModal from './EditWordModal'
import Status from './Status'

import './Study.css'

export default class Study extends PureComponent {
  componentDidMount() {
    const { actions, scores, words, auth } = this.props
    if (
      auth.token &&
      (scores.fetchStatus === 'INIT' || scores.fetchStatus === 'ERROR')
    ) {
      actions.fetchScores().catch(error => {
        this.props.actions.showAlert(
          'Request Failed',
          'Failed to fetch scores for words. Would you like to reload?',
          'reload'
        )
      })
    }

    if (words.fetchStatus === 'INIT' || words.fetchStatus === 'ERROR') {
      actions.fetchWords().catch(error => {
        this.props.actions.showAlert(
          'Request Failed',
          'Failed to fetch list of words. Would you like to reload?',
          'reload'
        )
      })
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
    const { study, words, scores } = this.props
    if (words.fetchStatus === 'SUCCESS' && scores.fetchStatus === 'SUCCESS') {
      if (study.isEvaluating) {
        return <Answer {...this.props} />
      } else {
        return <Question {...this.props} />
      }
    }
  }

  render() {
    return (
      <div className="Study">
        <Header title="Study" />
        {this.props.auth.token && (
          <Fragment>
            <Toolbar actions={this.props.actions} role={this.props.auth.role} />
            {this.getContent()}
            <OptionsModal {...this.props} />
            <EditWordModal
              {...this.props}
              isAdmin={this.props.auth.role === 'admin'}
            />
            <Status
              status={this.props.study.status}
              actions={this.props.actions}
            />
          </Fragment>
        )}

        {!this.props.auth.token && (
          <Unauthorized actions={this.props.actions} />
        )}
      </div>
    )
  }
}
