import React from 'react'
import { Link } from 'react-router-dom'

// import Logo from 'icons/Logo'
import './Home.css'

export default function() {
  return (
    <div className="Home">
      <section className="Home__top">
        <div className="Home__title">
          <h1>Persian Flashcards</h1>
          <h2>A collection of words for reference and memorization.</h2>
          <Link to="/words" className="Home__button">
            Get Started &gt;
          </Link>
        </div>
      </section>
      <section className="Home__middle">
        <p>
          This website is a currated list of Persian words that can be used as a{' '}
          <Link className="link" to="/words">
            dictionary of words
          </Link>{' '}
          or study{' '}
          <Link className="link" to="/quiz">
            flashcards
          </Link>. It uses a spaced repetition technique, so you can quickly
          learn new words and commit them to long term memory.
        </p>

        <p>
          Each word is tagged with different topics so that users can focus on
          learner specific words. Also, each word includes phonetic
          pronounciation.
        </p>
      </section>

      <section className="Home__bottom">
        <p>
          This is an open source project by{' '}
          <a className="link" href="http://www.aherriot.com">
            Andrew Herriot.
          </a>{' '}
          The source is available at{' '}
          <a className="link" href="https://www.github.com/aherriot/persian">
            github.com/aherriot/persian
          </a>.
        </p>
      </section>
    </div>
  )
}
