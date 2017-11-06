import React from 'react'

import './Status.css'

export default function Status({ status, actions }) {
  if (!status) {
    return null
  }

  if (status === 'CATEGORY_FINISHED') {
    return (
      <div className="Status">
        Finished studying this category for now.{' '}
        <a href="#" className="link" onClick={actions.openOptionsModal}>
          Try another one.
        </a>
      </div>
    )
  } else if (status === 'WORDS_FINISHED') {
    return (
      <div className="Status">
        Finished studying for now. Take a break and come back later.
      </div>
    )
  }
}
