// Higher Order Component
import React from 'react'
import { withFormik } from 'formik'
import classnames from 'classnames'

// Our inner form component which receives our form's state and updater methods as props
const InnerCreateAccountForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isValid,
  isSubmitting,
  auth
}) => {
  const usernameError = touched.username && errors.username
  const emailError = touched.email && errors.email
  const passwordError = touched.password && errors.password

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <div className="formGroup">
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

      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          className={classnames({ error: emailError })}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {emailError && <div className="error">{errors.email}</div>}
      </div>

      <div className="formGroup">
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
      </div>
      <div className="buttonRow">
        <button type="submit" disabled={!isValid || isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  )
}

// Wrap our form with the using withFormik HoC
const CreateAccountForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ username: '', password: '' }),

  validate: (values, props) => {
    let errors = {}

    if (!values.username) {
      errors.username = 'Username is required'
    }

    if (!values.email) {
      errors.email = 'Email is required'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    }

    return errors
  },
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.actions
      .createAccount(values.username, values.email, values.password)
      .then(resp => {
        setSubmitting(false)
        props.actions.closeAuthDialog()
      })
      .catch(error => {
        setErrors({ password: error.message })
        console.log(error)
        setSubmitting(false)
      })
  }
})(InnerCreateAccountForm)

export default CreateAccountForm
