import React from 'react'
import Histogram from './Histogram'
import './ProgressSummary.css'

export default function ProgressSummary({ profile, words, scores, actions }) {
  return (
    <div>
      <h2 className="ProgressSummary__heading">Study Progress Histogram</h2>

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

      <p>This histogram shows the progress studying each word.</p>
    </div>
  )
}
