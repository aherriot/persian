import React from 'react'
import { Link } from 'react-router-dom'

import './Home.css'

export default function() {
  return (
    <div>
      <section className="top">Welcome to Persian Flash Cards</section>
      <section className="middle">
        This app features a dictionary of <Link to="/words">words</Link>
      </section>

      <section className="bottom">
        This is a free personal project by{' '}
        <a href="http://www.aherriot.com">Andrew Herriot</a>
      </section>
    </div>
  )
}
