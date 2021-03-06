// const ErrorReporting = require('@google-cloud/error-reporting')
const codes = require('./codes')

let errorReporting
// if (process.env.GAE_INSTANCE) {
//   errorReporting = ErrorReporting()
// }

module.exports = function respondWithError(resp, error) {
  if (typeof error === 'string') {
    const errorObj = codes[error]
    if (errorObj) {
      return resp
        .status(errorObj.status)
        .json({ code: error, message: errorObj.message })
    } else {
      console.error('ERROR: UnknownError')

      // if (process.env.GAE_INSTANCE) {
      //   // Google cloud error report
      //   errorReporting.report(error)
      // }

      return resp
        .status(500)
        .json({ code: 'unknownError', message: 'Unknown error', error: error })
    }
  } else {
    const errorObj =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error

    // if (process.env.GAE_INSTANCE) {
    //   // Google cloud error report
    //   errorReporting.report(error)
    // }

    return resp
      .status(500)
      .json({ code: 'unknownError', message: 'Unknown error', error: errorObj })
  }
}
