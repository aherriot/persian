import React, { PureComponent } from 'react'
import Modal from 'components/Modal'
import ChangePasswordForm from './ChangePasswordForm'

export default class ChangePasswordModal extends PureComponent {
  render() {
    const { open, actions, id } = this.props

    return (
      <Modal
        open={open}
        onClose={actions.closeChangePasswordModal}
        title="Change Password">
        <ChangePasswordForm
          id={id}
          actions={actions}
          finishedSubmitAction={actions.closeChangePasswordModal}
          cancelAction={actions.closeChangePasswordModal}
        />
      </Modal>
    )
  }
}
