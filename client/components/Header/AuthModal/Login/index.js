import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form'
import styles from './Login.css'

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
      .then(() => {
        this.props.actions.fetchScores();
      })
      .catch(error => {
        throw new SubmissionError({_error: 'Incorrect username or password!'})
      })
  }

  onGoToCreateAccount = (e) => {
    e.preventDefault()
    this.props.actions.showCreateAccountDialog()
  }

  render() {
    const { error, handleSubmit, pristine, invalid, submitting } = this.props

    return (
      <form className={styles.form} onSubmit={this.props.handleSubmit(this.onLogin)}>
        <div className={styles.body}>
          <h2>Login</h2>

          {this.props.auth.error &&
            <div className={styles.formError}>Your login has expired, please log in again.</div>
          }

          <p>
            Or you can: <a href="#" onClick={this.onGoToCreateAccount}>Create Account</a>
          </p>

          <Field name="username" type="text" component={renderField} label="Username"/>
          <Field name="password" type="password" component={renderField} label="Password"/>

          {error && <strong>{error}</strong>}
        </div>
        <div className={styles.buttons}>
          <button type="submit" disabled={pristine || invalid || submitting}>Login</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  validate
})(Login)
