import React, { PureComponent } from 'react'
// import { Link } from 'react-router-dom'
import Header from 'components/Header'
import './Leaderboard.css'

export default class Leaderboard extends PureComponent {
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
            <div className="Leaderboard__header">
              <div className="Leaderboard__header-cell">Rank</div>
              <div className="Leaderboard__header-cell">Username</div>
              <div className="Leaderboard__header-cell">Total Score</div>
              <div className="Leaderboard__header-cell"># of Words</div>
            </div>
            {rows.map((user, index) => {
              return (
                <div className="Leaderboard__row" key={user.username}>
                  <div className="Leaderboard__cell">{index + 1}</div>
                  <div className="Leaderboard__cell">{user.username}</div>
                  <div className="Leaderboard__cell">{user.score}</div>
                  <div className="Leaderboard__cell">{user.quizzedWords}</div>
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
