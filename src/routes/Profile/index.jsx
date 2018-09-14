import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from 'components/Header'
import ChangePasswordModal from './ChangePasswordModal'
import './Profile.css'
import ProgressSummary from './ProgressSummary'

export default class Profile extends Component {
  componentDidMount() {
    const { actions, words, scores, auth } = this.props

    if (auth.token) {
      if (scores.fetchStatus === 'INIT' || scores.fetchStatus === 'ERROR') {
        actions.fetchScores().catch(error => {
          this.props.actions.showAlert(
            'Request Failed',
            'Failed to fetch scores for words. Would you like to reload?',
            'reload'
          )
        })
      }
      if (words.fetchStatus === 'INIT' || words.fetchStatus === 'ERROR') {
        actions.fetchWords().catch(error => {
          this.props.actions.showAlert(
            'Request Failed',
            'Failed to fetch list of words. Would you like to reload?',
            'reload'
          )
        })
      }
    }
  }

  render() {
    const { actions, auth, profile, words, scores } = this.props
    return (
      <div className="Profile">
        <Header title="Profile" />
        {auth.token && (
          <div className="Profile__content">
            <h1>{auth.username}</h1>

            <p>Welcome to your profile.</p>
            <p>
              You can view the{' '}
              <Link className="link" to="/words">
                list of words
              </Link>{' '}
              or{' '}
              <Link className="link" to="/quiz">
                study the flashcards
              </Link>
              .
            </p>
            <ProgressSummary
              profile={profile}
              words={words}
              scores={scores}
              actions={actions}
            />
            {/* <p>Change username or email</p> */}
            {/* <p>Delete account</p> */}

            <br />
            <h2 className="">Actions</h2>

            <p>
              <button
                type="button"
                className="button"
                onClick={actions.openChangePasswordModal}>
                Change Password
              </button>
            </p>

            <p>
              <button className="button" onClick={actions.logout}>
                Logout
              </button>
            </p>
            <ChangePasswordModal
              open={profile.showChangePasswordModal}
              actions={actions}
              id={auth.id}
            />
          </div>
        )}

        {!auth.token && (
          <div className="Profile__content">
            <div>
              You are not logged in but you can still view the{' '}
              <Link className="link" to="/words">
                list of words
              </Link>
              .
            </div>
          </div>
        )}
      </div>
    )
  }
}
