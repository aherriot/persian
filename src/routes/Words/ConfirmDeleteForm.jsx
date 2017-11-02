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
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__body">
        <p>Are you sure you want to delete this word?</p>
      </div>

      <div className="form__button-row">
        <button type="submit" className="button">
          Submit
        </button>
      </div>
    </form>
  )
}

// Wrap our form with the using withFormik HoC
const LoginForm = withFormik({
  // Transform outer props into form values
  // mapPropsToValues: props => ({}),

  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.actions
      .login(values.username, values.password)
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
})(InnerLoginForm)

export default LoginForm
