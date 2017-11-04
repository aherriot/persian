import React, { Component } from 'react'
import Header from 'components/Header'
import Alert from 'components/Alert'

import Toolbar from './Toolbar'
import List from './List'
import FilterModal from './FilterModal'
import WordModal from './WordModal'
import AddWordModal from './AddWordModal'

import './Words.css'

export default class Words extends Component {
  componentDidMount() {
    this.props.actions.fetchWords()
    this.props.actions.fetchScores()
  }

  render() {
    const { actions, words, scores, wordsRoute } = this.props

    return (
      <div className="Words">
        <Header title="Words" />
        <Toolbar actions={actions} />
        <List
          words={words}
          scores={scores}
          actions={actions}
          wordsRoute={wordsRoute}
        />
        <FilterModal
          open={wordsRoute.filterModalOpen}
          actions={actions}
          words={words}
          searchText={wordsRoute.searchText}
          tagFilter={wordsRoute.tagFilter}
          sortBy={wordsRoute.sortBy}
        />
        <WordModal
          open={!!wordsRoute.selectedWordId}
          actions={actions}
          words={words}
          scores={scores}
          selectedWordId={wordsRoute.selectedWordId}
          editingWord={wordsRoute.editingWord}
          confirmingDelete={wordsRoute.confirmingDelete}
        />
        <AddWordModal open={wordsRoute.addModalOpen} actions={actions} />
        <Alert />
      </div>
    )
  }
}
