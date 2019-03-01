import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class WordDetails extends PureComponent {
  onResetScore = () => {
    const { actions, selectedWordId } = this.props

    actions.updateScore(selectedWordId, 'both', 0)
  }

  render() {
    const { actions, words, scores, selectedWordId, role } = this.props

    let fromEnglishScore = '-'
    let fromPersianScore = '-'

    const word = words.byId[selectedWordId]
    if (word) {
      const scoreForWord = scores.byWordId[selectedWordId]

      if (scoreForWord && scoreForWord.fromEnglish) {
        fromEnglishScore = scoreForWord.fromEnglish.score + ' / 7'
      }

      if (scoreForWord && scoreForWord.fromPersian) {
        fromPersianScore = scoreForWord.fromPersian.score + ' / 7'
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
          {role && [
            <label key="englishLabel">Score from English</label>,
            <div key="englishValue" className="form__text">
              {fromEnglishScore}
            </div>,

            <label key="persianLabel">Score from Persian</label>,
            <div key="persianValue" className="form__text">
              {fromPersianScore}
            </div>
          ]}

          {!role && [
            <label key="scoresLabel">Scores</label>,
            <div key="scoresValue">
              Please create an account to track progress learning each word.
            </div>
          ]}
        </div>

        {role === 'admin' && (
          <div className="form__button-row">
            <button className="button" onClick={this.onResetScore}>
              Reset Score
            </button>
            <div className="button-spacer" />
            <button className="button" onClick={actions.confirmDeleteWord}>
              Delete
            </button>
            <div className="button-spacer" />
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
}

WordDetails.propTypes = {
  actions: PropTypes.object.isRequired,
  words: PropTypes.object.isRequired,
  scores: PropTypes.object.isRequired,
  selectedWordId: PropTypes.string
}
