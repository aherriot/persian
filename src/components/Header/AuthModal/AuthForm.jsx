// Higher Order Component
import React from 'react'
import { withFormik } from 'formik'

// Our inner form component which receives our form's state and updater methods as props
const InnerAuthForm = ({
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
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
      />
      {touched.username && errors.username && <div>{errors.username}</div>}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
      />
      {touched.password && errors.password && <div>{errors.password}</div>}

      <button type="submit" disabled={!isValid || isSubmitting}>
        Submit
      </button>
    </form>
  )
}

// Wrap our form with the using withFormik HoC
const AuthForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ username: '', password: '' }),

  validate: (values, props) => {
    let errors = {}

    if (!values.username) {
      errors.username = 'Username Missing'
    }

    if (!values.password) {
      errors.password = 'Password Missing'
    }

    return errors
  },
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.actions
      .login(values.username, values.password)
      .then(resp => {
        setSubmitting(false)
      })
      .catch(error => {
        setErrors({ password: error.message })
        console.log(error)
        setSubmitting(false)
      })
  }
})(InnerAuthForm)

export default AuthForm
