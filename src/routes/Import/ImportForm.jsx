// Higher Order Component
import React from 'react'
import { withFormik } from 'formik'

// Our inner form component which receives our form's state and updater methods as props
const InnerImportForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isValid,
  isSubmitting,
  actions
}) => {
  return (
    <form className="Import__form" onSubmit={handleSubmit}>
      <p>Please paste in JSON data to import</p>

      <textarea
        className="Import__textarea"
        id="words"
        name="words"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.words}
        autoFocus
      />
      {errors.words && <div className="error">{errors.words}</div>}

      <div className="form__button-row">
        <button type="button" className="link">
          cancel
        </button>
        <button
          type="submit"
          className="button"
          disabled={!isValid || isSubmitting}>
          Import
        </button>
      </div>
    </form>
  )
}

// Wrap our form with the using withFormik HoC
const ImportForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ words: '' }),
  isInitialValid: true,
  validate: (values, props) => {
    let errors = {}

    if (!values.words) {
      errors.words = 'Please enter words to import.'
    }

    return errors
  },
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    let words

    try {
      words = JSON.parse(values.words)
    } catch (err) {
      setErrors({ words: 'Unabled to parse JSON.' })
      setSubmitting(false)
      return
    }

    props.actions
      .addWord(words)
      .then(resp => {
        setSubmitting(false)
        props.actions.closeAuthModal()
      })
      .catch(error => {
        setErrors({ words: error.message })
        setSubmitting(false)
      })
  }
})(InnerImportForm)

export default ImportForm
