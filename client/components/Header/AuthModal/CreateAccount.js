import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form'

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.username) {
    errors.username = 'Enter username'
  } else if (values.username.length < 3) {
    errors.username = 'Must be at least 3 characters'
  } else if (values.username.length > 10) {
    errors.username = 'Must be 10 characters or less'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (!values.password2) {
    errors.password2 = 'Required'
  } else if (values.password !== values.password2) {
    errors.password2 = 'Passwords do not match'
    errors.password = 'Passwords do not match'

  }

  return errors;
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

class CreateAccount extends Component {
  constructor(props) {
    super(props);
  }

  onCreateAccount = (values) => {

    return this.props.actions.createAccount(values.username, values.email, values.password)
      .catch(error => {
        debugger
        switch(error.code) {

        case 'passwordLength':
          throw new SubmissionError({password: 'Password too short'})

        default:
          throw new SubmissionError({_error: 'Error creating account'})
        }
      })
  }

  render() {
    const { error, handleSubmit, pristine, submitting } = this.props

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onCreateAccount)}>
          <Field name="username" type="text" component={renderField} label="Username"/>
          <Field name="email" type="text" component={renderField} label="Email"/>
          <Field name="password" type="password" component={renderField} label="Password"/>
          <Field name="password2" type="password" component={renderField} label="Repeat Password"/>

          {error && <strong>{error}</strong>}
          <br/>
          <button type="submit" disabled={submitting}>Create Account</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'createAccount',
  validate
})(CreateAccount)
