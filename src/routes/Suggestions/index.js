import React, { PureComponent } from 'react'
// import { Link } from 'react-router-dom'
import Header from 'commonComponents/Header'
import './Suggestions.css'

export default class Suggestions extends PureComponent {
  componentDidMount() {
    this.props.actions.fetchAllSuggestions()
  }

  onDelete = id => {
    if (window.confirm('Are you sure you want to delete this suggestion?')) {
      this.props.actions.deleteSuggestion(id)
    }
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
            <div className="Suggestions__row">
              <div className="Suggestions__cell">Username</div>
              <div className="Suggestions__cell">English</div>
              <div className="Suggestions__cell">Persian</div>
              <div className="Suggestions__cell">Phonetic</div>
              <div className="Suggestions__cell">Tags</div>
              <div className="Suggestions__cell">Actions</div>
            </div>
            {suggestionIds.map(suggestionId => {
              const suggestion = suggestions.byId[suggestionId]
              return (
                <div className="Suggestions__row" key={suggestionId}>
                  <div className="Suggestions__cell">
                    {suggestion.userId
                      ? suggestion.userId.username
                      : 'Anonymous User'}
                  </div>
                  <div className="Suggestions__cell">{suggestion.english}</div>
                  <div className="Suggestions__cell">{suggestion.persian}</div>
                  <div className="Suggestions__cell">{suggestion.phonetic}</div>
                  <div className="Suggestions__cell">
                    {suggestion.tags.join(',')}
                  </div>
                  <div className="Suggestions__cell">
                    <button
                      className="link"
                      onClick={() => this.onDelete(suggestionId)}>
                      X
                    </button>
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
