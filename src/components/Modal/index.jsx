import React, { Component } from 'react'
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

export default class Modal extends Component {
  constructor(props) {
    super(props)

    this.state = { open: false }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.open !== newProps.open)
      if (newProps.open) {
        this.setState({ open: true })
      } else {
        this.setState({ open: false })
      }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeoutRef)
  }

  onRequestClose = () => {
    this.setState({ open: false })

    this.timeoutRef = window.setTimeout(this.props.onClose, 200)
  }

  render() {
    const { title, children } = this.props
    return (
      <ReactModal
        isOpen={this.state.open}
        onRequestClose={this.onRequestClose}
        closeTimeoutMS={200}
        className={windowClassNames}
        overlayClassName={overlayClassNames}>
        <h1>{title}</h1>
        {children}
      </ReactModal>
    )
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node
}
