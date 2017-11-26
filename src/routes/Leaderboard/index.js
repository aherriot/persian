import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Header from 'components/Header'
import './Leaderboard.css'

export default class Leaderboard extends Component {
  componentDidMount() {
    this.props.actions.fetchLeaderboard()
  }

  render() {
    const { leaderboard } = this.props

    const rows = leaderboard.data.slice()
    rows.sort((a, b) => {
      return b.score - a.score
    })

    return (
      <div className="Leaderboard">
        <Header title="Leaderboard" />
        <div className="Leaderboard__content">
          <h2>Leaderboard</h2>
          <div className="Leaderboard__table">
            <div className="Leaderboard__row">
              <div className="Leaderboard__cell">Username</div>
              <div className="Leaderboard__cell">Total Score</div>
              <div className="Leaderboard__cell"># of Words Studied</div>
              <div className="Leaderboard__cell">mostRecent</div>
            </div>
            {rows.map(user => {
              const date = new Date(user.mostRecent)
              return (
                <div className="Leaderboard__row" key={user.username}>
                  <div className="Leaderboard__cell">{user.username}</div>
                  <div className="Leaderboard__cell">{user.score}</div>
                  <div className="Leaderboard__cell">{user.quizzedWords}</div>
                  <div className="Leaderboard__cell">
                    {date.toLocaleDateString() +
                      ' ' +
                      date.toLocaleTimeString()}
                  </div>
                </div>
              )
            })}
          </div>

          {leaderboard.status === 'PENDING' && <p>loading...</p>}

          {leaderboard.data.length === 0 && <p>No Leaderboard</p>}
        </div>
      </div>
    )
  }
}
