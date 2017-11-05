import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div>
      Please login to study or you can view the
      <Link to="/words">list of words</Link>
    </div>
  )
}
