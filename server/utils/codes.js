// A mapping of known error responses
const codes = {
  usernameMissing: { status: 400, message: 'username field is missing' },
  usernameLength: {
    status: 400,
    message: 'Username must be between 3 and 10 characters'
  },
  usernameInvalid: {
    status: 400,
    message:
      'Username must only contain letters, numbers, underscores, hyphen, or periods'
  },
  usernameDuplicate: {
    status: 400,
    message: 'Username already in use'
  },

  passwordMissing: { status: 400, message: 'password field is missing' },
  passwordLength: {
    status: 400,
    message: 'Password must be between 6 and 30 characters'
  },
  newPasswordMissing: {
    status: 400,
    message: 'newPassword field is missing'
  },

  invalidAuthentication: {
    status: 401,
    message: 'Username or password is incorrect'
  },

  emailMissing: {
    status: 400,
    message: 'email field is missing'
  },
  emailInvalid: {
    status: 400,
    message: 'Email is not valid'
  },
  emailDuplicate: {
    status: 400,
    message: 'Email already in use'
  },

  userWrong: {
    status: 401,
    message: 'Cannot perform operations on other users'
  },

  userNotFound: {
    status: 404,
    message: 'User not found'
  },

  // auth

  missingAuthToken: {
    status: 401,
    message: 'Authorization token is missing from the headers'
  },

  unauthorized: {
    status: 401,
    message: 'Not authorized to perform this action'
  },

  adminOnly: {
    status: 401,
    message: 'Not authorized to perform this action'
  },

  TokenExpiredError: {
    status: 401,
    message: 'JSON web token has is expired'
  },

  JsonWebTokenError: {
    status: 401,
    message: 'Invalid json web token'
  },

  // words
  wordInvalid: {
    status: 400,
    message:
      'word must contain valid fields "english", "persian", "phonetic", and "tags"'
  },

  wordArrayInvalid: {
    status: 400,
    message:
      'Array of words must contain valid fields "english", "persian", "phonetic", and "tags"'
  },

  // scores
  directionInvalid: {
    status: 400,
    message: 'The "direction" field must be "fromPersian" or "fromEnglish"'
  },
  scoreInvalid: {
    status: 400,
    message: 'The "score" field must be a number between 0 and 6'
  },
  wordNotFound: {
    status: 404,
    message: 'Word does not exist with this id'
  },
  wordIdInvalid: {
    status: 400,
    message: 'Word ID is not valid'
  },

  //suggestions
  suggestionNotFound: {
    status: 404,
    message: 'Suggestion does not exist with this id'
  },
  textMissing: {
    status: 400,
    message: 'Suggestion requires a text property'
  }
}

module.exports = codes
