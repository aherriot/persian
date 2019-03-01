import React, { PureComponent } from 'react'
import Header from 'commonComponents/Header'

import './Export.css'

export default class Export extends PureComponent {
  componentDidMount() {
    this.props.actions.fetchWords()
  }

  getWordsData = () => {
    const { words, tagFilter } = this.props

    let wordList
    if (tagFilter) {
      wordList = words.byTag[tagFilter] || []
    } else {
      wordList = Object.keys(words.byId)
    }

    let data = '['
    wordList.forEach(wordId => {
      const word = words.byId[wordId]
      data +=
        JSON.stringify({
          persian: word.persian,
          english: word.english,
          phonetic: word.phonetic,
          tags: word.tags
        }) + ',\n'
    })
    // remove trailing comma and close the array bracket
    return data.substr(0, data.length - 2) + ']'
  }

  render() {
    const { actions, tagFilter, words } = this.props
    return (
      <div className="Export">
        <Header title="Export" />
        <div className="Export__toolbar">
          <select
            id="tag"
            value={tagFilter}
            onChange={e => actions.setTagFilter(e.target.value)}>
            <option value="">---No Filter---</option>
            {Object.keys(words.byTag)
              .sort()
              .map(function(tag) {
                return (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                )
              })}
          </select>
        </div>
        <textarea value={this.getWordsData()} readOnly />
      </div>
    )
  }
}
