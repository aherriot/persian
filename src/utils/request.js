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
  type: type + '_PENDING'
})

const requestSuccess = (type, response, time) => ({
  type: type + '_SUCCESS',
  payload: {
    response,
    time
  }
})

const requestError = (type, error) => ({
  type: type + '_ERROR',
  error: error
})

export function authRequest(actionType, url, method = 'GET', data) {
  return (dispatch, getState) => {
    dispatch(requestPending(actionType))

    return request(url, method, data)
      .then(response => {
        dispatch(requestSuccess(actionType, response, Date.now()))
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
          dispatch({ type: 'auth/AUTH_ERROR', error: error })
          // but don't propogate the error
          // return Promise.reject(error)
        } else {
          dispatch(requestError(actionType, error))
          return Promise.reject(error)
        }
      })
  }
}
