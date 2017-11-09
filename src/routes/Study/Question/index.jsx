import React from 'react'
import classnames from 'classnames'

import TextEvaluation from './TextEvaluation'
import SelfEvaluation from './SelfEvaluation'
import MultipleChoiceEvaluation from './MultipleChoiceEvaluation'

import './Question.css'

export default function Question(props) {
  const {
    study: { selectedWordId, options: { questionSide, evaluation } },
    words
  } = props

  if (selectedWordId) {
    const word = words.byId[selectedWordId]
    return (
      <div className="Question">
        <div
          className={classnames('Question__prompt', {
            'Question__prompt--persian': questionSide === 'persian'
          })}>
          {word && word[questionSide]}
        </div>

        {evaluation === 'TYPING' && <TextEvaluation {...props} />}

        {evaluation === 'SELF' && <SelfEvaluation {...props} />}

        {evaluation === 'MULTIPLE' && <MultipleChoiceEvaluation {...props} />}
      </div>
    )
  } else {
    return <div className="Question">No words match filter.</div>
  }
}
