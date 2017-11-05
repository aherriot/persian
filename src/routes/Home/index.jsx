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
        <Link to="/words" className="words">
          <div>Words</div>
        </Link>
        <Link to="/quiz" className="quiz">
          <div>Study</div>
        </Link>
      </section>

      <section className="bottom">
        This is a free personal project by{' '}
        <a href="http://www.aherriot.com">Andrew Herriot</a>
      </section>
    </div>
  )
}
