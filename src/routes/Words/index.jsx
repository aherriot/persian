import React, { Component } from 'react'
import Header from 'components/Header'

import Toolbar from './Toolbar'
import List from './List'
import FilterModal from './FilterModal'
import WordModal from './WordModal'
import AddWordModal from './AddWordModal'

import './Words.css'

export default class Words extends Component {
  componentDidMount() {
    const { actions, words, scores, auth } = this.props

    if (
      auth.token &&
      (scores.fetchStatus === 'INIT' || scores.fetchStatus === 'ERROR')
    ) {
      actions.fetchScores()
    }

    if (words.fetchStatus === 'INIT' || words.fetchStatus === 'ERROR') {
      actions.fetchWords()
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
        <AddWordModal open={wordsRoute.addModalOpen} actions={actions} />
      </div>
    )
  }
}
