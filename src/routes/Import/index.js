import React, { Component } from 'react'
import Header from 'components/Header'

import ImportForm from './ImportForm'
import './Import.css'

export default class Import extends Component {
  render() {
    // const { actions } = this.props
    return (
      <div className="Import">
        <Header title="Import" />
        <ImportForm {...this.props} />
      </div>
    )
  }
}