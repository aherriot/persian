import React, { Component } from 'react'
import Modal from 'components/Modal'

export default class OptionsModal extends Component {
  onTagChanged = e => {
    this.props.actions.setOptions({
      ...this.props.study.options,
      tagFilter: e.target.value
    })
    // Also select a new word
    this.props.actions.selectWord()
  }

  onEvaluationChanged = e => {
    this.props.actions.setOptions({
      ...this.props.study.options,
      evaluation: e.target.value
    })
  }

  onAlgorithmChanged = e => {
    this.props.actions.setOptions({
      ...this.props.study.options,
      algorithm: e.target.value
    })
    this.props.actions.selectWord()
  }

  onAlternateSidesChanged = e => {
    this.props.actions.setOptions({
      ...this.props.study.options,
      alternateSides: e.target.checked
    })
  }

  onShowPersianChanged = e => {
    const { options } = this.props.study.options
    let { questionSide, answerSide } = options

    if (e.target.checked) {
      if (questionSide === 'persian') {
        questionSide = 'phonetic'
      }

      if (answerSide === 'persian') {
        answerSide = 'phonetic'
      }
    } else {
      if (questionSide === 'phonetic') {
        questionSide = 'persian'
      }

      if (answerSide === 'phonetic') {
        answerSide = 'persian'
      }
    }

    this.props.actions.setOptions({
      ...options,
      questionSide: questionSide,
      answerSide: answerSide
    })
  }

  onQuestionSideChanged = e => {
    const { options } = this.props.study.options
    let { questionSide, answerSide } = options

    this.props.actions.setOptions({
      ...this.props.study.options,
      questionSide: e.target.value
    })
  }

  onAnswerSideChanged = e => {
    this.props.actions.setOptions({
      ...this.props.study.options,
      answerSide: e.target.value
    })
  }

  render() {
    const { actions, words, study } = this.props

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
                onChange={this.onTagChanged}>
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
                onChange={this.onEvaluationChanged}>
                <option value="MULTIPLE">Multiple Choice</option>
                <option value="TYPING">Type Response</option>
                <option value="SELF">Self Evaluation</option>
              </select>
            </div>

            <div className="form__group">
              <label htmlFor="algorithm">Selection Algorithm</label>
              <select
                id="algorithm"
                value={study.options.algorithm}
                onChange={this.onAlgorithmChanged}>
                <option value="SPACED_REPETITION">Spaced Repetition</option>
                <option value="LEAST_RECENT">Least Recent</option>
                <option value="RANDOM">Random</option>
              </select>
            </div>

            <div className="form__group">
              <input
                type="checkbox"
                id="alternateSides"
                checked={study.options.alternateSides}
                onChange={this.onAlternateSidesChanged}
              />
              <label htmlFor="alternateSides">Alternate Sides</label>
            </div>

            {study.options.alternateSides && (
              <div className="form__group">
                <input
                  type="checkbox"
                  id="showPersian"
                  checked={
                    study.options.questionSide !== 'persian' &&
                    study.options.answerSide !== 'persian'
                  }
                  onChange={this.onShowPersianChanged}
                />
                <label htmlFor="showPersian">Show Phonetic Persian</label>
              </div>
            )}

            {!study.options.alternateSides && [
              <div key="question" className="form__group">
                <label htmlFor="questionSide">Question Side</label>
                <select
                  id="questionSide"
                  value={study.options.questionSide}
                  onChange={this.onQuestionSideChanged}>
                  <option value="persian">Persian</option>
                  <option value="english">English</option>
                  <option value="phonetic">Phonetic Persian</option>
                </select>
              </div>,

              <div key="answer" className="form__group">
                <label htmlFor="answerSide">Answer Side</label>
                <select
                  id="answerSide"
                  value={study.options.answerSide}
                  onChange={this.onAnswerSideChanged}>
                  <option value="persian">Persian</option>
                  <option value="english">English</option>
                  <option value="phonetic">Phonetic Persian</option>
                </select>
              </div>
            ]}
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
}
