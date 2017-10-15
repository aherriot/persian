import React from 'react'
import PropTypes from 'prop-types'

import './Modal.css'

export default function Modal({ open, onClose, children }) {
  if (open) {
    return (
      <div class="background" onClick={onClose}>
        <div className="Modal">{children}</div>
      </div>
    )
  } else {
    return null
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}
