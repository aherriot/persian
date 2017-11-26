import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Header from 'components/Header'
import './Suggestions.css'

export default class Suggestions extends Component {
  componentDidMount() {
    this.props.actions.fetchAllSuggestions()
  }

  render() {
    const { suggestions } = this.props

    const suggestionIds = Object.keys(suggestions.byId)
    console.log(suggestionIds.length)

    return (
      <div className="Suggestions">
        <Header title="Suggestions" />
        <div className="Suggestions__content">
          <h2>Suggestions</h2>
          <div className="Suggestions__table">
            {suggestionIds.map(suggestionId => {
              const suggestion = suggestions.byId[suggestionId]
              return (
                <div className="Suggestions__row" key={suggestionId}>
                  <div className="Suggestions__cell">{suggestion.english}</div>
                  <div className="Suggestions__cell">{suggestion.persian}</div>
                  <div className="Suggestions__cell">{suggestion.phonetic}</div>
                  <div className="Suggestions__cell">
                    {suggestion.tags.join(',')}
                  </div>
                </div>
              )
            })}
          </div>

          {suggestions.status === 'PENDING' && <p>loading...</p>}

          {suggestionIds.length === 0 && <p>No Suggestions</p>}
        </div>
      </div>
    )
  }
}
