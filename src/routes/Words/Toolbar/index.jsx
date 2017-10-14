import React from 'react'
import { Link } from 'react-router-dom'

import './Toolbar.css'

import filterUrl from './filter.svg'
import plusUrl from './plus.svg'
import studyUrl from './study.svg'

export default function() {
  return (
    <div className="Toolbar">
      <div role="button" onClick={() => alert('filter')}>
        <img className="icon" src={filterUrl} alt="filter" />
        Filter
      </div>
      <div role="button" onClick={() => alert('add')}>
        <img className="icon" src={plusUrl} alt="add word" />
        Add
      </div>
      <Link to="/quiz" role="button">
        <img className="icon" src={studyUrl} alt="quiz" />
        Study
      </Link>
    </div>
  )
}
