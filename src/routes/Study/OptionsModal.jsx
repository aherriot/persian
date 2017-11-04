import React from 'react'
import Modal from 'components/Modal'

export default function OptionsModal({ actions, words, study }) {
  return (
    <Modal
      open={study.showOptions}
      onClose={actions.closeOptionsModal}
      title="Study Options">
      <form className="form">
        <div className="form__body">
          <div className="form__group">
            <label htmlFor="tag">Study Words by Category</label>
            <select
              id="tag"
              value={study.options.tagFilter}
              onChange={e => {
                actions.setOptions({
                  ...study.options,
                  tagFilter: e.target.value
                })
                actions.selectWord()
              }}>
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

          <div className="form__group">
            <label htmlFor="evaluation">Quiz Type</label>
            <select
              id="evaluation"
              value={study.options.evaluation}
              onChange={e =>
                actions.setOptions({
                  ...study.options,
                  evaluation: e.target.value
                })}>
              <option value="MULTIPLE">Multiple Choice</option>
              <option value="TYPING">Type Response</option>
              <option value="SELF">Self Evaluation</option>
            </select>
          </div>

          <div className="form__group">
            <label htmlFor="questionSide">Question Side</label>
            <select
              id="questionSide"
              value={study.options.questionSide}
              onChange={e =>
                actions.setOptions({
                  ...study.options,
                  questionSide: e.target.value
                })}>
              <option value="persian">Persian</option>
              <option value="english">English</option>
              <option value="phonetic">Phonetic Persian</option>
            </select>
          </div>

          <div className="form__group">
            <label htmlFor="answerSide">Answer Side</label>
            <select
              id="answerSide"
              value={study.options.answerSide}
              onChange={e =>
                actions.setOptions({
                  ...study.options,
                  answerSide: e.target.value
                })}>
              <option value="persian">Persian</option>
              <option value="english">English</option>
              <option value="phonetic">Phonetic Persian</option>
            </select>
          </div>

          <div className="form__group">
            <label htmlFor="algorithm">Selection Algorithm</label>
            <select
              id="algorithm"
              value={study.options.algorithm}
              onChange={e => {
                actions.setOptions({
                  ...study.options,
                  algorithm: e.target.value
                })
                actions.selectWord()
              }}>
              <option value="SPACED_REPETITION">Spaced Repetition</option>
              <option value="LEAST_RECENT">Least Recent</option>
              <option value="RANDOM">Random</option>
            </select>
          </div>
        </div>
        <div className="form__button-row">
          <button
            type="button"
            className="button"
            onClick={actions.closeOptionsModal}>
            Okay
          </button>
        </div>
      </form>
    </Modal>
  )
}
