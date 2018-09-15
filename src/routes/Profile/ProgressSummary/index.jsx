import React from 'react'
import Histogram from './Histogram'
import './ProgressSummary.css'

export default function ProgressSummary({ profile, words, scores, actions }) {
  return (
    <div>
      <h2 className="ProgressSummary__heading">Study Progress</h2>
      <p>
        This is a histogram shows the number of words with each score. The
        higher the score, the more the word has been commited to long term
        memory.
      </p>

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
        </div>
      </div>

      <Histogram profile={profile} words={words} scores={scores} />
    </div>
  )
}
