function getHeaders() {
  const token = localStorage.getItem('token')

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  if (token) {
    return {
      ...headers,
      Authorization: 'Bearer ' + token
    }
  } else {
    return headers
  }
}

async function request(url, method = 'GET', data) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: getHeaders(),
      body: JSON.stringify(data)
    })

    try {
      // parse the response
      const json = await response.json()

      if (response.ok) {
        return Promise.resolve(json)
      } else {
        return Promise.reject(json)
      }
    } catch (err) {
      // JSON parse error
      return Promise.reject(err)
    }
  } catch (err) {
    // fetch exception. Maybe network errors?
    return Promise.reject(err)
  }
}
export default request

const requestPending = type => ({
  type: type + '_PENDING',
  payload: {}
})

const requestSuccess = (type, response) => ({
  type: type + '_SUCCESS',
  payload: {
    response
  }
})

const requestError = (type, error) => ({
  type: type + '_ERROR',
  error: error
})

export function authRequest(type, url, method = 'GET', data) {
  return (dispatch, getState) => {
    dispatch(requestPending(type))

    request(url, method, data)
      .then(response => {
        dispatch(requestSuccess(type, response))
        return response
      })
      .catch(error => {
        if (
          [
            'TokenExpiredError',
            'JsonWebTokenError',
            'missingAuthToken'
          ].includes(error.code)
        ) {
          dispatch({ type: 'AUTH_ERROR', error: error })
        } else {
          dispatch(requestError(type, error))
          return error
        }
      })
  }
}
