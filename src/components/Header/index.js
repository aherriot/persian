import React from 'react'

import './Header.css'
import Logo from '../Logo'

export default function Header({ title }) {
  return (
    <header className="Header">
      <Logo isLink />
      <div>{title}</div>
    </header>
  )
}
