import React, { Component } from 'react'
import classnames from 'classnames'
import ReactVirtualizedList from 'react-virtualized/dist/es/List'
import ReactVirtualizedAutoSizer from 'react-virtualized/dist/es/AutoSizer'

import getTotalScore from 'utils/getTotalScore'

import './List.css'

export default class List extends Component {
  constructor(props) {
    super(props)

    // We are using local state to cache the sorted filtered words
    // so that it doesn't get computed with each render.
    // We pass in the props, because we want to reuse this function
    // in component will receive props.
    this.state = {
      filterSortedWords: this.filterAndSortWords(
        props.words,
        props.scores,
        props.tagFilter,
        props.wordsRoute.searchText,
        props.wordsRoute.sortBy
      )
    }
  }

  filterAndSortWords = (words, scores, tagFilter, searchText, sortBy) => {
    if (words.fetchStatus !== 'SUCCESS') {
      return []
    }

    const filteredSortedWords = []

    // The words are pre sorted by tags or hashmap by id
    // so if we have specified a tag, we don't have to look
    // as every word, we can directly look at the words that have that tag
    let wordsList
    if (tagFilter) {
      wordsList = words.byTag[tagFilter]
    } else {
      wordsList = Object.keys(words.byId)
    }

    for (let i = 0; i < wordsList.length; i++) {
      const word = words.byId[wordsList[i]]

      if (!searchText) {
        filteredSortedWords.push(word)
      } else if (
        word.english.includes(searchText) ||
        word.persian.includes(searchText) ||
        word.phonetic.includes(searchText)
      ) {
        filteredSortedWords.push(word)
      }
    }

    filteredSortedWords.sort((wordA, wordB) => {
      if (sortBy === 'score') {
        const scoreA = getTotalScore(wordA._id, scores)
        const scoreB = getTotalScore(wordB._id, scores)
        return scoreB - scoreA
      } else {
        return wordA[sortBy].localeCompare(wordB[sortBy])
      }
    })

    return filteredSortedWords
  }

  rowRenderer = ({ key, index, style, parent: { props: { width } } }) => {
    const word = this.state.filterSortedWords[index]

    let score
    if (width >= 700) {
      score = getTotalScore(word._id, this.props.scores) || '-'
    }

    return (
      <div
        key={key}
        style={style}
        className={classnames('List__row', {
          'List__row--odd': index % 2 === 0
        })}
        onClick={() => this.props.actions.selectWord(word._id)}>
        <div>{word.english}</div>
        {width >= 460 && <div>{word.phonetic}</div>}
        {width >= 700 && <div>{score}</div>}
        {width >= 1000 && <div>{word.tags.join(', ')}</div>}
        <div className="rtl">{word.persian}</div>
      </div>
    )
  }

  noRowsRenderer = () => {
    const { status } = this.props
    if (status === 'PENDING') {
      return <div className="noRows">Loading...</div>
    } else {
      return <div className="noRows">No rows match filter</div>
    }
  }

  componentWillReceiveProps(newProps) {
    if (
      this.props.words !== newProps.words ||
      this.props.scores !== newProps.scores ||
      this.props.tagFilter !== newProps.tagFilter ||
      this.props.wordsRoute.searchText !== newProps.wordsRoute.searchText ||
      this.props.wordsRoute.sortBy !== newProps.wordsRoute.sortBy
    ) {
      this.setState({
        filterSortedWords: this.filterAndSortWords(
          newProps.words,
          newProps.scores,
          newProps.tagFilter,
          newProps.wordsRoute.searchText,
          newProps.wordsRoute.sortBy
        )
      })
    }

    if (
      this.props.wordsRoute.sortBy !== newProps.wordsRoute.sortBy ||
      this.props.scores !== newProps.scores
    ) {
      this.list.forceUpdateGrid()
    }
  }

  render() {
    return (
      <div className="List">
        <div className="List__header List__row">
          <div>English</div>
          <div className="medium">Phonetic</div>
          <div className="large">Score</div>
          <div className="x-large">Tags</div>
          <div className="rtl">فارسی</div>
        </div>
        <div className="List__table--wrapper">
          <ReactVirtualizedAutoSizer>
            {({ width, height }) => (
              <ReactVirtualizedList
                ref={ref => (this.list = ref)}
                width={width}
                height={height}
                rowCount={this.state.filterSortedWords.length}
                rowHeight={25}
                rowRenderer={this.rowRenderer}
                noRowsRenderer={this.noRowsRenderer}
              />
            )}
          </ReactVirtualizedAutoSizer>
        </div>
      </div>
    )
  }
}
