import React from 'react'
import { Link } from 'react-router-dom'

import './Logo.css'

export default function Logo({ isLink }) {
  if (isLink) {
    return (
      <div className="Logo link">
        <Link to="/">ف</Link>
      </div>
    )
  } else {
    return (
      <div className="Logo">
        <span>ف</span>
      </div>
    )
  }
}
