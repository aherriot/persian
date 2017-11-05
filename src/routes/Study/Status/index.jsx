import React from 'react'

import './Status.css'

export default function Status({ status }) {
  if (!status) {
    return null
  }

  if (status === 'categoryFinished') {
    return (
      <div className="Status">
        No more words to study at this time for this category. Try another
        category.
      </div>
    )
  }
}
