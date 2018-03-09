import React, { Component } from 'react'
import classnames from 'classnames'
import ReactVirtualizedList from 'react-virtualized/dist/es/List'
import ReactVirtualizedAutoSizer from 'react-virtualized/dist/es/AutoSizer'

import getTotalScore from 'utils/getTotalScore'
import getMostRecentStudyDate from 'utils/getMostRecentStudyDate'

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
      wordsList = words.byTag[tagFilter] || []
    } else {
      wordsList = Object.keys(words.byId)
    }

    for (let i = 0; i < wordsList.length; i++) {
      const word = words.byId[wordsList[i]]

      if (!searchText) {
        filteredSortedWords.push(word)
      } else if (
        word.english.toLowerCase().includes(searchText) ||
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

        // if one of the values is null
        if (scoreA === null) {
          if (scoreB === null) {
            return 0
          } else {
            return 1
          }
        } else if (scoreB === null) {
          return -1
        } else {
          return scoreB - scoreA
        }
      } else if (sortBy === 'mostRecentlyStudied') {
        const dateA = getMostRecentStudyDate(wordA._id, scores)
        const dateB = getMostRecentStudyDate(wordB._id, scores)

        if (dateA === null) {
          if (dateB === null) {
            return 0
          } else {
            return 1
          }
        } else if (dateB === null) {
          return -1
        } else {
          return dateB - dateA
        }
      } else if (sortBy === 'createdAt') {
        return (
          new Date(wordB.createdAt).getTime() -
          new Date(wordA.createdAt).getTime()
        )
      } else if (sortBy === 'tags') {
        return wordA[sortBy].join(',').localeCompare(wordB[sortBy].join(','))
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
      score = getTotalScore(word._id, this.props.scores)

      // if score is null
      // we have to be careful, because 0 is a valid number.
      if (score === null) {
        score = '-'
      }
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
    // only update the sorted filtered list if the following
    // properties change.
    if (
      this.props.words !== newProps.words ||
      this.props.scores !== newProps.scores ||
      this.props.tagFilter !== newProps.tagFilter ||
      this.props.wordsRoute.searchText !== newProps.wordsRoute.searchText ||
      this.props.wordsRoute.sortBy !== newProps.wordsRoute.sortBy
    ) {
      // save these values to check if we need to rerender
      // after the state changes (see comment below)
      const prevSortBy = this.props.wordsRoute.sortBy
      const prevScores = this.props.scores
      const prevWords = this.props.words

      this.setState(
        {
          filterSortedWords: this.filterAndSortWords(
            newProps.words,
            newProps.scores,
            newProps.tagFilter,
            newProps.wordsRoute.searchText,
            newProps.wordsRoute.sortBy
          )
        },
        () => {
          // Because the React Virtualized List only updates when the number
          // of rows change, there are prop changes where we have to
          // force the table to redraw because the number of rows may not
          // change, but the List content changes.
          if (
            prevSortBy !== this.props.wordsRoute.sortBy ||
            prevScores !== this.props.scores ||
            prevWords !== this.props.words
          ) {
            this.list.forceUpdateGrid()
          }
        }
      )
    }
  }

  render() {
    const { actions } = this.props
    return (
      <div className="List">
        <div className="List__header List__row">
          <div onClick={() => actions.setSortBy('english')}>English</div>
          <div className="medium" onClick={() => actions.setSortBy('phonetic')}>
            Phonetic
          </div>
          <div className="large" onClick={() => actions.setSortBy('score')}>
            Score
          </div>
          <div className="x-large" onClick={() => actions.setSortBy('tags')}>
            Tags
          </div>
          <div className="rtl" onClick={() => actions.setSortBy('persian')}>
            فارسی
          </div>
        </div>
        <div className="List__table--wrapper">
          <ReactVirtualizedAutoSizer>
            {({ width, height }) => (
              <ReactVirtualizedList
                ref={ref => (this.list = ref)}
                overscanRowCount={15}
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
