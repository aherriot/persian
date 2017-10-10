import React from 'react'
import { Link } from 'react-router-dom'

import './Home.css'

export default function() {
  return (
    <div className="Home">
      <section className="top">
        <div>
          <h1>
            <span className="logo">ف</span>&nbsp;Persian Flashcards
          </h1>
          <h2>
            A collection of Persian flashcards available free for everyone.
          </h2>
        </div>
      </section>
      <section className="middle">
        <p>With this app, you can:</p>
        <ul>
          <li>
            Browse the dictionary of <Link to="/words">words</Link>
          </li>
          <li>Study words using spaced repetition</li>
          <li>other thing</li>
        </ul>
      </section>

      <section className="bottom">
        <div>
          <button type="button">Sign in</button>
          <button type="button">Create Account</button>
        </div>
        This is a free personal project by{' '}
        <a href="http://www.aherriot.com">Andrew Herriot</a>
      </section>
    </div>
  )
}
