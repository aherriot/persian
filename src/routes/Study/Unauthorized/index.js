import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized({ actions }) {
  return (
    <div className="Study__Unauthorized">
      <p>
        Please{' '}
        <a
          className="link"
          href="#"
          role="button"
          onClick={() => actions.openAuthModal(true)}>
          Create an Account
        </a>
        {' or '}
        <a
          className="link"
          href="#"
          role="button"
          onClick={() => actions.openAuthModal(false)}>
          Login
        </a>{' '}
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
