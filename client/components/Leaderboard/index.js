import React, {Component} from 'react';
import constants from '../../constants/constants';

class Leaderboard extends Component {
  componentDidMount() {
    if(this.props.auth.role === 'admin') {
      if(this.props.leaderboard.status === constants.INIT || this.props.leaderboard.status === constants.ERROR) {
        this.props.actions.fetchLeaderboard();
      }
    }
  }

  formatDate(dateString) {
    if (!dateString) {
      return 'never'
    }
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  render() {

    const leaders = this.props.leaderboard.data.sort((a,b) => b.score - a.score)
    return (
      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <th>Username</th>
            <th># of Words Quizzed</th>
            <th>Score</th>
            <th>Most Recent Quiz</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map(leader =>
            <tr key={leader.username}>
              <td>{leader.username}</td>
              <td>{leader.quizzedWords}</td>
              <td>{leader.score}</td>
              <td>{this.formatDate(leader.mostRecent)}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

}


Leaderboard.propTypes = {
  leaderboard: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};

export default Leaderboard
