import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classnames from 'classnames'

import './Modal.css'

const duration = 200

// const defaultStyle = {
//   transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
//   opacity: 0.1
// }

// const transitionStyles = {
//   entering: { opacity: 0.1 },
//   entered: { opacity: 1 }
// }

export default class Modal extends Component {
  constructor(props) {
    super(props)

    this.state = { closing: false }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout)
  }

  onRequestClose = () => {
    this.setState({ closing: true })

    this.timeout = window.setTimeout(() => {
      this.props.onClose()
      this.setState({ closing: false })
    }, duration)
  }

  componentWillReceiveProps(newProps) {
    // this.setState()
  }

  onStopPropagation(e) {
    e.stopPropagation()
  }

  render() {
    const { open, onClose, children } = this.props
    if (open || this.state.closing) {
      return (
        <div className="background" onClick={onClose}>
          <div className="Modal" onClick={this.onStopPropagation}>
            {children}
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}
