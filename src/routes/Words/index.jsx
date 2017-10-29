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
