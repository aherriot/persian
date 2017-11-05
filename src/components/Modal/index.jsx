import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import './Modal.css'

const windowClassNames = {
  base: 'Modal__window',
  afterOpen: 'Modal__window--after-open',
  beforeClose: 'Modal__window--before-close'
}

const overlayClassNames = {
  base: 'Modal__overlay',
  afterOpen: 'Modal__overlay--after-open',
  beforeClose: 'Modal__overlay--before-close'
}

export default function Modal({ open, onClose, title, children }) {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      closeTimeoutMS={200}
      className={windowClassNames}
      overlayClassName={overlayClassNames}>
      <h1>{title}</h1>
      {children}
    </ReactModal>
  )
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node
}
