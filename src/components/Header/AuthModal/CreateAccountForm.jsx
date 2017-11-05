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
  auth,
  actions
}) => {
  const usernameError = touched.username && errors.username
  const emailError = touched.email && errors.email
  const passwordError = touched.password && errors.password
  const password2Error = touched.password2 && errors.password2

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
        </div>

        <div className="form__group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            className={classnames({ error: password2Error })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password2}
          />
          {password2Error && <div className="error">{errors.password2}</div>}
        </div>

        <div>
          or{' '}
          <button type="button" className="link" onClick={actions.showLogin}>
            Login
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
const CreateAccountForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    username: '',
    email: '',
    password: '',
    password2: ''
  }),

  validate: (values, props) => {
    let errors = {}

    if (!values.username) {
      errors.username = 'Username is required'
    }

    if (!values.email) {
      errors.email = 'Email is required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)
    ) {
      errors.email = 'Email is not valid'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    }

    if (!values.password2) {
      errors.password2 = 'Password is required'
    }

    if (values.password !== values.password2) {
      errors.password2 = 'Passwords do not match'
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
        setSubmitting(false)
      })
  }
})(InnerCreateAccountForm)

export default CreateAccountForm
