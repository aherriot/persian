import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized({ actions }) {
  return (
    <div className="Study__Unauthorized">
      <p>
        In order to track your progress studying Persian, you first need to {' '}
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
        </button>.
      </p>
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
