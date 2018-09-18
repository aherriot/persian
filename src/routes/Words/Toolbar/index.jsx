import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import './Toolbar.css'

import Filter from 'icons/Filter'
import Plus from 'icons/Plus'
import Study from 'icons/Study'

export default class Toolbar extends PureComponent {
  onAdd = () => {
    if (this.props.role) {
      this.props.actions.openAddModal()
    } else {
      this.props.actions.showAlert(
        'Create Account First',
        'Please create an account first in order to suggest new words.'
      )
    }
  }

  render() {
    const { actions } = this.props
    return (
      <div className="Toolbar">
        <div role="button" onClick={actions.openFilterModal}>
          <Filter />
          Find
        </div>
        <div role="button" onClick={this.onAdd}>
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
}
