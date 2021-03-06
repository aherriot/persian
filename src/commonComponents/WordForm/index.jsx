import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import classnames from 'classnames'

const InnerWordForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isValid,
  isSubmitting,
  cancelAction,
  isAdmin
}) => {
  const englishError = touched.english && errors.english
  const persianError = touched.persian && errors.persian
  const phoneticError = touched.phonetic && errors.phonetic
  const tagsError = touched.tags && errors.tags
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__body">
        <div className="form__group">
          <label htmlFor="persian">Persian</label>
          <input
            type="text"
            id="persian"
            name="persian"
            className={classnames({ error: persianError }, 'rtl')}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.persian}
            autoCapitalize="none"
            autoFocus
          />
          {persianError && <div className="error">{errors.persian}</div>}
        </div>

        <div className="form__group">
          <label htmlFor="english">English</label>
          <input
            type="text"
            id="english"
            name="english"
            className={classnames({ error: englishError })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.english}
            autoCapitalize="none"
          />
          {englishError && <div className="error">{errors.english}</div>}
        </div>

        <div className="form__group">
          <label htmlFor="phonetic">Phonetic Persian</label>
          <input
            type="text"
            id="phonetic"
            name="phonetic"
            className={classnames({ error: phoneticError })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phonetic}
            autoCapitalize="none"
          />
          {phoneticError && <div className="error">{errors.phonetic}</div>}
        </div>

        <div className="form__group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className={classnames({ error: tagsError })}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tags}
            autoCapitalize="none"
          />
          {tagsError && <div className="error">{errors.tags}</div>}
        </div>

        {errors._generic && <div className="error">{errors._generic}</div>}
      </div>

      <div className="form__button-row">
        <button
          type="button"
          className="button secondary"
          onClick={cancelAction}>
          Cancel
        </button>
        <div className="button-spacer" />
        <button
          type="submit"
          className="button"
          disabled={!isValid || isSubmitting}>
          {isAdmin ? 'Save' : 'Suggest'}
        </button>
      </div>
    </form>
  )
}

// Wrap our form with the using withFormik HoC
const WordForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => {
    if (props.word) {
      return {
        ...props.word,
        tags: props.word.tags.join(',')
      }
    } else {
      return {
        english: '',
        persian: '',
        phonetic: '',
        tags: ''
      }
    }
  },

  isInitialValid: props => true,

  validate: (values, props) => {
    let errors = {}

    if (!values.english) {
      errors.english = 'English is required'
    }

    if (!values.persian) {
      errors.persian = 'Persian is required'
    }

    if (!values.phonetic) {
      errors.phonetic = 'Phonetic Persian is required'
    }

    if (!values.tags) {
      errors.tags = 'Tags are required'
    }

    return errors
  },
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    const word = {
      english: values.english.trim(),
      persian: values.persian.trim(),
      phonetic: values.phonetic.trim(),
      tags: values.tags.split(',').map(tag => tag.trim()),
      _id: props.word ? props.word._id : undefined // we include this in case suggesting an edit to a word
    }

    props
      .submitAction(word)
      .then(resp => {
        setSubmitting(false)
        props.finishedSubmitAction()
      })
      .catch(error => {
        setErrors({ _generic: error.message || 'Unknown Error' })
        setSubmitting(false)
      })
  }
})(InnerWordForm)

WordForm.propTypes = {
  submitAction: PropTypes.func.isRequired,
  finishedSubmitAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

export default WordForm
