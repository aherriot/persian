import React, { Component } from 'react'
import Header from '../../components/Header'
import List from './List'

import './Words.css'

export default class Words extends Component {
  render() {
    return (
      <div className="Words">
        <Header title="Words" />
        <div>toolbar: sort, filter, add/suggest, quiz</div>
        <List />
      </div>
    )
  }
}
