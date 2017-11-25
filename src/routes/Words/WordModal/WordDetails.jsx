import React from 'react'
import PropTypes from 'prop-types'

export default function WordDetails({
  actions,
  words,
  scores,
  selectedWordId,
  role
}) {
  let fromEnglishScore = '-'
  let fromPersianScore = '-'

  const word = words.byId[selectedWordId]
  if (word) {
    const scoreForWord = scores.byWordId[selectedWordId]

    if (scoreForWord && scoreForWord.fromEnglish) {
      fromEnglishScore = scoreForWord.fromEnglish.score + ' / 6'
    }

    if (scoreForWord && scoreForWord.fromPersian) {
      fromPersianScore = scoreForWord.fromPersian.score + ' / 6'
    }
  }

  return (
    <div className="form">
      <div className="form__body">
        <label>Persian</label>
        <div className="form__text">{word && word.persian}</div>

        <label>English</label>
        <div className="form__text">{word && word.english}</div>

        <label>Phonetic Persian</label>
        <div className="form__text">{word && word.phonetic}</div>

        <label>Categories</label>
        <div className="form__text">{word && word.tags.join(', ')}</div>

        <label>Score from English</label>
        <div className="form__text">{fromEnglishScore}</div>

        <label>Score from Persian</label>
        <div className="form__text">{fromPersianScore}</div>
      </div>
      {role === 'admin' && (
        <div className="form__button-row">
          <button className="button" onClick={actions.confirmDeleteWord}>
            Delete
          </button>
          <button className="button" onClick={actions.editWord}>
            Edit
          </button>
        </div>
      )}

      {role !== 'admin' && (
        <div className="form__button-row">
          <button className="button" onClick={actions.deselectWord}>
            Okay
          </button>
        </div>
      )}
    </div>
  )
}

WordDetails.propTypes = {
  actions: PropTypes.object.isRequired,
  words: PropTypes.object.isRequired,
  scores: PropTypes.object.isRequired,
  selectedWordId: PropTypes.string
}
