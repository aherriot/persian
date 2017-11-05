import React from 'react'
import { Link } from 'react-router-dom'

import './Toolbar.css'

import Filter from 'icons/Filter'
import Plus from 'icons/Plus'
import Study from 'icons/Study'

export default function Toolbar({ actions }) {
  return (
    <div className="Toolbar">
      <div role="button" onClick={actions.openFilterModal}>
        <Filter />
        Filter
      </div>
      <div role="button" onClick={actions.openAddModal}>
        <Plus />
        Add
      </div>
      <Link to="/quiz" role="button">
        <Study />
        Study
      </Link>
    </div>
  )
}
