import React, {Component} from 'react';

import { Field, reduxForm, SubmissionError } from 'redux-form'

const validate = values => {

  const errors = {}

  if (!values.username) {
    errors.username = 'Enter username'
  }

  if (!values.password) {
    errors.password = 'Enter password'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class Login extends Component {
  onLogin = (values) => {

    return this.props.actions.login(values.username, values.password)
      .catch(error => {
        throw new SubmissionError({_error: 'Incorrect username or password!'})
      })
  }

  render() {
    const { error, handleSubmit, pristine, submitting } = this.props

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onLogin)}>

          {this.props.auth.error &&
            <div>Your login has expired, please log in again.</div>
          }

          <Field name="username" type="text" component={renderField} label="Username"/>

          <Field name="password" type="password" component={renderField} label="Password"/>

          {error && <strong>{error}</strong>}
          <br/>
          <button type="submit" disabled={submitting}>Login</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'login',
  validate
})(Login)
