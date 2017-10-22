import React, { Component } from 'react'
import Header from 'components/Header'

import Toolbar from './Toolbar'
import List from './List'
import FilterModal from './FilterModal'

import './Words.css'

export default class Words extends Component {
  componentDidMount() {
    this.props.actions.fetchWords()
  }

  render() {
    const { actions, words, wordsRoute } = this.props
    const wordArray = []
    for (let wordId in words.byId) {
      const word = words.byId[wordId]

      if (!wordsRoute.searchText) {
        wordArray.push(word)
      } else if (word.english.includes(wordsRoute.searchText)) {
        wordArray.push(word)
      }
    }

    wordArray.sort((wordA, wordB) => {
      return wordA[wordsRoute.sortBy].localeCompare(wordB[wordsRoute.sortBy])
    })

    return (
      <div className="Words">
        <Header title="Words" />
        <Toolbar actions={actions} />
        <List
          words={wordArray}
          status={words.fetchStatus}
          actions={actions}
          sortBy={wordsRoute.sortBy}
        />
        <FilterModal
          open={wordsRoute.filterModalOpen}
          actions={actions}
          searchText={wordsRoute.searchText}
          sortBy={wordsRoute.sortBy}
        />
        {/* <Modal open={wordsRoute.addModalOpen} onClose={actions.closeAddModal}>
          <div>Add Word dialog</div>
        </Modal>

        <Modal
          open={!!wordsRoute.selectedWordId}
          onClose={actions.deselectWord}>
          {wordsRoute.selectedWordId && (
            <div>
              <div>{words.byId[wordsRoute.selectedWordId].english}</div>
              <div className="rtl">
                {words.byId[wordsRoute.selectedWordId].persian}
              </div>
              <div>{words.byId[wordsRoute.selectedWordId].phonetic}</div>
              <div>{words.byId[wordsRoute.selectedWordId].tags.join(', ')}</div>
            </div>
          )}
        </Modal> */}
      </div>
    )
  }
}
