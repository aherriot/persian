import React from 'react'
import { Link } from 'react-router-dom'

import './Toolbar.css'

import Cogs from 'icons/Cogs'
import Pencil from 'icons/Pencil'
import List from 'icons/List'

export default function Toolbar({ actions }) {
  return (
    <div className="Toolbar">
      <div role="button" tabIndex={0} onClick={actions.openOptionsModal}>
        <Cogs />
        Options
      </div>
      <div role="button" tabIndex={0} onClick={actions.openEditWordModal}>
        <Pencil />
        Edit
      </div>
      <Link to="/words" role="button">
        <List />
        Words
      </Link>
    </div>
  )
}
