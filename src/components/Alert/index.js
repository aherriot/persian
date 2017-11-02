import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hideAlert } from 'store/app/actions'

import Modal from 'components/Modal'

class Alert extends Component {
  constructor(props) {
    super(props)
    this.state = { open: true }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alerts.length < this.props.alerts.length) {
      this.setState({ open: true })
    }
  }

  onClose = () => {
    this.setState({ open: false })

    this.timerRef = window.setTimeout(() => {
      this.props.actions.hideAlert()
    }, 300)
  }

  componentWillUnmount() {
    window.clearTimeout(this.timerRef)
  }

  render() {
    const { alerts } = this.props

    if (alerts.length === 0) {
      return null
    }

    const alert = alerts[0]

    return (
      <Modal open={this.state.open} title={alert.title} onClose={this.onClose}>
        <div className="form">
          <div className="form__body">{alert.text}</div>
          <div className="form__button-row">
            <button type="button" className="button" onClick={this.onClose}>
              Okay
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    alerts: state.app.alerts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ hideAlert }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)
