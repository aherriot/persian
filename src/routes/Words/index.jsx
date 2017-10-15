import React, { Component } from 'react'
import Header from 'components/Header'
import Modal from 'components/Modal'

import Toolbar from './Toolbar'
import List from './List'

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
      wordArray.push(word)
    }

    return (
      <div className="Words">
        <Header title="Words" />
        <Toolbar actions={actions} />
        <List words={wordArray} actions={actions} />
        <Modal
          open={wordsRoute.filterModalOpen}
          onClose={actions.closeFilterModal}>
          <div>Filter dialog</div>
        </Modal>
        <Modal open={wordsRoute.addModalOpen} onClose={actions.closeAddModal}>
          <div>Add Word dialog</div>
        </Modal>

        <Modal
          open={!!wordsRoute.selectedWordId}
          onClose={actions.deselectWord}>
          <div>
            {wordsRoute.selectedWordId &&
              words.byId[wordsRoute.selectedWordId].phonetic}
          </div>
        </Modal>
      </div>
    )
  }
}
