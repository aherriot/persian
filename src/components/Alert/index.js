import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hideAlert } from 'store/app/actions'

import Modal from 'components/Modal'

class Alert extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { open: true }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alerts.length < this.props.alerts.length) {
      this.setState({ open: true })
    }
  }

  onAffirm = () => {
    const { alerts } = this.props

    this.setState({ open: false })

    this.timerRef = window.setTimeout(() => {
      // This code can definitely be improved
      // The problem here is that we want to push a queue
      // of alert messages into the redux state,
      // but we can't (shouldn't) put callbacks
      // or non-serializable data in the redux state.

      // Instead, I have put an action type for each alert,
      // and that allows me to perform different tasks
      // when the form is dismissed. This should be reworked
      // into a better solution, but maybe on a rainy day.

      if (alerts[0].action === 'reload') {
        window.location.reload()
      }

      this.props.actions.hideAlert()
    }, 400)
  }

  onReject = () => {
    this.setState({ open: false })
    this.timerRef = window.setTimeout(() => {
      this.props.actions.hideAlert()
    }, 400)
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
      <Modal open={this.state.open} title={alert.title} onClose={this.onReject}>
        <div className="form">
          <div className="form__body">{alert.text}</div>
          <div className="form__button-row">
            {alert.action === 'reload' && (
              <button
                type="button"
                className="button secondary"
                onClick={this.onReject}>
                No
              </button>
            )}
            <div className="button-spacer" />
            <button type="button" className="button" onClick={this.onAffirm}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert)
