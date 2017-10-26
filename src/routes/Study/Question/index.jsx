import React from 'react'
import TextEvaluation from './TextEvaluation'

export default function Question(props) {
  const { study, words } = props

  if (study.selectedWordId) {
    const word = words.byId[study.selectedWordId]
    return (
      <div>
        <div> {word && word[study.options.questionSide]}</div>
        {study.options.evaluation === 'TYPING' && <TextEvaluation {...props} />}
        {study.options.evaluation === 'SELF' && <TextEvaluation {...props} />}
        {study.options.evaluation === 'CHOICE' && <TextEvaluation {...props} />}
      </div>
    )
  } else {
    return <div>No word</div>
  }
}
