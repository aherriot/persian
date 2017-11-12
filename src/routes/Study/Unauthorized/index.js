import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized({ actions }) {
  return (
    <div className="Study__Unauthorized">
      <p>
        Please{' '}
        <button
          className="link"
          type="button"
          onClick={() => actions.openAuthModal(true)}>
          Create an Account
        </button>
        {' or '}
        <button
          className="link"
          type="button"
          onClick={() => actions.openAuthModal(false)}>
          Login
        </button>{' '}
        to study flashcards.
      </p>
      <br />
      <p>
        {' '}
        You can also view the{' '}
        <Link className="link" to="/words">
          list of words
        </Link>{' '}
        without an account.
      </p>
    </div>
  )
}
