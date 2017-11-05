// Higher Order Component
import React from 'react'
import { withFormik } from 'formik'
import classnames from 'classnames'

// Our inner form component which receives our form's state and updater methods as props
const InnerChangePasswordForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isValid,
  isSubmitting,
  auth,
  actions
}) => {
  const passwordError = touched.password && errors.password
  const newPasswordError = touched.newPassword && errors.newPassword
  const newPassword2Error = touched.newPassword2 && errors.newPassword2
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__body">
        <div className="form__group">
          <label htmlFor="password">Current Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={classnames({ error: passwordError })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {passwordError && <div className="error">{errors.password}</div>}
        </div>

        <div className="form__group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className={classnames({ error: newPasswordError })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.newPassword}
          />
          {newPasswordError && (
            <div className="error">{errors.newPassword}</div>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="newPassword2">Confirm New Password</label>
          <input
            type="password"
            id="newPassword2"
            name="newPassword2"
            className={classnames({ error: newPassword2Error })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.newPassword2}
          />
          {newPassword2Error && (
            <div className="error">{errors.newPassword2}</div>
          )}
        </div>
      </div>

      <div className="form__button-row">
        <button
          type="submit"
          className="button"
          disabled={!isValid || isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  )
}

// Wrap our form with the using withFormik HoC
const ChangePasswordForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    password: '',
    newPassword: '',
    newPassword2: ''
  }),

  validate: (values, props) => {
    let errors = {}

    if (!values.password) {
      errors.password = 'Password is required'
    }

    if (!values.newPassword) {
      errors.newPassword = 'New Password is required'
    }

    if (!values.newPassword2) {
      errors.newPassword2 = 'New Password confirmation is required'
    } else if (values.newPassword !== values.newPassword2) {
      errors.newPassword2 = 'Passwords do not match'
    }

    return errors
  },
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.actions
      .changePassword(props.id, values.password, values.newPassword)
      .then(resp => {
        setSubmitting(false)
        props.actions.closeChangePasswordModal()
      })
      .catch(error => {
        setErrors({ password: error.message })
        console.log(error)
        setSubmitting(false)
      })
  }
})(InnerChangePasswordForm)

export default ChangePasswordForm
