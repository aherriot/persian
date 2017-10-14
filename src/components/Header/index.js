import React from 'react'

import './Header.css'
import Logo from '../Logo'

export default function Header({ title }) {
  return (
    <header className="Header">
      <div className="left">
        <Logo isLink />
        <div className="title">{title}</div>
      </div>
      <div className="right">username</div>
    </header>
  )
}
