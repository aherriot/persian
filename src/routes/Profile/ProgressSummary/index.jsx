import React from 'react'
import XIcon from 'icons/X'

import './ProgressSummary.css'

export default function ProgressSummary({ profile, words, scores, actions }) {
  const scoreHistogram = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0
  }

  let wordList
  if (profile.selectedTag) {
    wordList = words.byTag[profile.selectedTag] || []
  } else {
    wordList = Object.keys(words.byId)
  }

  let mostFrequentScore = 0
  wordList.forEach(wordId => {
    const score = scores.byWordId[wordId]
    if (score) {
      let sum = 0
      if (score.fromPersian) {
        sum += score.fromPersian.score
      }

      if (score.fromEnglish) {
        sum += score.fromEnglish.score
      }

      scoreHistogram[sum]++
      if (scoreHistogram[sum] > mostFrequentScore) {
        mostFrequentScore = scoreHistogram[sum]
      }
    } else {
      scoreHistogram[0]++
      if (scoreHistogram[0] > mostFrequentScore) {
        mostFrequentScore = scoreHistogram[0]
      }
    }
  })

  let histogram = []
  for (let score in scoreHistogram) {
    let numWordsAtScore = scoreHistogram[score]
    histogram.push(
      <div key={score} className="ProgressSummary__row">
        <div className="ProgressSummary__row-label">{score}</div>
        <div
          className="ProgressSummary__bar"
          style={{ width: (numWordsAtScore / mostFrequentScore) * 100 + '%' }}>
          {numWordsAtScore}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="ProgressSummary__heading">Study Progress</h2>
      <p>This is a histogram of the score for each word</p>

      <div className="form__group">
        <label htmlFor="tag">Progress by Tag</label>
        <div className="form__action-group">
          <select
            id="tag"
            value={profile.selectedTag}
            onChange={e => actions.setCategory(e.target.value)}>
            <option value="">*All Words*</option>
            {Object.keys(words.byTag)
              .sort()
              .map(function(tag) {
                return (
                  <option key={tag} value={tag}>
                    {tag} ({words.byTag[tag].length})
                  </option>
                )
              })}
          </select>
          {/* <div
            className="form__action"
            onClick={() => {
              actions.setCategory('')
            }}>
            <XIcon fill={profile.selectedTag.length > 0 ? '#888' : '#bbb'} />
          </div> */}
        </div>
      </div>

      {histogram}
    </div>
  )
}
