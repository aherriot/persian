// Higher Order Component
import React from 'react'
import { withFormik } from 'formik'
import classnames from 'classnames'

// Our inner form component which receives our form's state and updater methods as props
const InnerLoginForm = ({
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
  const usernameError = touched.username && errors.username
  const passwordError = touched.password && errors.password
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__body">
        <div className="form__group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className={classnames({ error: usernameError })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            autoFocus
          />
          {usernameError && <div className="error">{errors.username}</div>}
        </div>
        <div className="form__group">
          <label htmlFor="password">Password</label>
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
          {errors._generic && <div className="error">{errors._generic}</div>}
        </div>
        <div>
          or{' '}
          <button
            type="button"
            className="link"
            onClick={actions.showCreateAccount}>
            Create Account
          </button>
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
const LoginForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ username: '', password: '' }),

  validate: (values, props) => {
    let errors = {}

    if (!values.username) {
      errors.username = 'Username is required'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    }

    return errors
  },
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.actions
      .login(values.username, values.password)
      .then(resp => {
        setSubmitting(false)
        props.actions.closeAuthModal()
        props.actions.fetchScores()
      })
      .catch(error => {
        setErrors({ _generic: error.message || 'Unknown Error' })
        setSubmitting(false)
      })
  }
})(InnerLoginForm)

export default LoginForm
