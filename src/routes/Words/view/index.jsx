import React, { PureComponent } from 'react'
import Header from 'commonComponents/Header'

import Toolbar from './Toolbar'
import List from './List'
import FilterModal from './FilterModal'
import WordModal from './WordModal'
import AddWordModal from './AddWordModal'

import './Words.css'

export default class Words extends PureComponent {
  componentDidMount() {
    const { actions, words, scores, auth } = this.props

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
  }

  render() {
    const { actions, words, scores, wordsRoute, tagFilter, auth } = this.props

    return (
      <div className="Words">
        <Header title="Words" />
        <Toolbar actions={actions} role={auth.role} />
        <List
          words={words}
          scores={scores}
          actions={actions}
          wordsRoute={wordsRoute}
          tagFilter={tagFilter}
        />
        <FilterModal
          open={wordsRoute.filterModalOpen}
          actions={actions}
          words={words}
          searchText={wordsRoute.searchText}
          tagFilter={tagFilter}
          sortBy={wordsRoute.sortBy}
        />
        <WordModal
          open={!!wordsRoute.selectedWordId}
          actions={actions}
          words={words}
          scores={scores}
          auth={auth}
          selectedWordId={wordsRoute.selectedWordId}
          editingWord={wordsRoute.editingWord}
          confirmingDelete={wordsRoute.confirmingDelete}
        />
        <AddWordModal
          open={wordsRoute.addModalOpen}
          actions={actions}
          role={auth.role}
        />
      </div>
    )
  }
}
