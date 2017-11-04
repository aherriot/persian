import React from 'react'

import TextEvaluation from './TextEvaluation'
import SelfEvaluation from './SelfEvaluation'
import MultipleChoiceEvaluation from './MultipleChoiceEvaluation'

import './Question.css'

export default function Question(props) {
  const { study, words } = props

  if (study.selectedWordId) {
    const word = words.byId[study.selectedWordId]
    return (
      <div className="Question">
        <div className="Question__prompt">
          {word && word[study.options.questionSide]}
        </div>

        {study.options.evaluation === 'TYPING' && <TextEvaluation {...props} />}

        {study.options.evaluation === 'SELF' && <SelfEvaluation {...props} />}

        {study.options.evaluation === 'MULTIPLE' && (
          <MultipleChoiceEvaluation {...props} />
        )}
      </div>
    )
  } else {
    return <div className="Question">No word</div>
  }
}
