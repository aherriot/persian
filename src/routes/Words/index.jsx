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
    const wordsToShow = []

    // The words are pre sorted by tags and hashmap by id
    // so if we have specified a tag, we don't have to look
    // as every word, we can directly look at the words for that filter
    let wordsList
    if (wordsRoute.tagFilter) {
      wordsList = words.byTag[wordsRoute.tagFilter]
    } else {
      wordsList = Object.keys(words.byId)
    }

    for (let i = 0; i < wordsList.length; i++) {
      const word = words.byId[wordsList[i]]

      if (!wordsRoute.searchText) {
        wordsToShow.push(word)
      } else if (word.english.includes(wordsRoute.searchText)) {
        wordsToShow.push(word)
      }
    }

    wordsToShow.sort((wordA, wordB) => {
      return wordA[wordsRoute.sortBy].localeCompare(wordB[wordsRoute.sortBy])
    })

    return (
      <div className="Words">
        <Header title="Words" />
        <Toolbar actions={actions} />
        <List
          words={wordsToShow}
          status={words.fetchStatus}
          actions={actions}
          sortBy={wordsRoute.sortBy}
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
