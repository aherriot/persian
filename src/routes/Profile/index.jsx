import React from 'react'
import Header from 'components/Header'

import './Profile.css'

export default function({ actions, auth }) {
  return (
    <div className="Profile">
      <Header title="Profile" />
      {auth.token && (
        <div>
          <div>Welcome to your profile</div>
          <button onClick={actions.logout}>Logout</button>
        </div>
      )}

      {!auth.token && (
        <div>
          <div>You are not logged in.</div>
        </div>
      )}
    </div>
  )
}
