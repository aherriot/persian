import React from 'react'
import Header from 'components/Header'

import './Profile.css'

export default function Profile({ actions, auth }) {
  return (
    <div className="Profile">
      <Header title="Profile" />
      {auth.token && (
        <div className="content">
          <h1>{auth.username}</h1>
          <div>Welcome to your profile</div>
          <div>Change password</div>
          <div>Change username or email</div>
          <div>Delete account</div>
          <div className="buttonRow">
            <button className="button" onClick={actions.logout}>
              Logout
            </button>
          </div>
        </div>
      )}

      {!auth.token && (
        <div className="content">
          <div>You are not logged in.</div>
        </div>
      )}
    </div>
  )
}
