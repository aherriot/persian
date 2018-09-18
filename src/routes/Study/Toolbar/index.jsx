import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import './Toolbar.css'

import Cogs from 'icons/Cogs'
import Pencil from 'icons/Pencil'
import ListIcon from 'icons/List'

export default class Toolbar extends PureComponent {
  render() {
    const { actions } = this.props
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
          <ListIcon />
          Words
        </Link>
      </div>
    )
  }
}
