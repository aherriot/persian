import React from 'react'
import { Link } from 'react-router-dom'
import Header from 'components/Header'
import ChangePasswordModal from './ChangePasswordModal'
import './Profile.css'

export default function Profile({ actions, auth, profile }) {
  return (
    <div className="Profile">
      <Header title="Profile" />
      {auth.token && (
        <div className="content">
          <h1>{auth.username}</h1>
          <br />

          <p>Welcome to your profile.</p>
          <p>
            You can view the{' '}
            <Link className="link" to="/words">
              list of words
            </Link>{' '}
            or{' '}
            <Link className="link" to="/quiz">
              study the flashcards
            </Link>.
          </p>
          {/* <p>Change username or email</p> */}
          {/* <p>Delete account</p> */}
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
        <div className="content">
          <div>
            You are not logged in but you can still view the{' '}
            <Link className="link" to="/words">
              list of words
            </Link>.
          </div>
        </div>
      )}
    </div>
  )
}
