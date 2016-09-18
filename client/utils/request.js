function getHeaders() {
  const token = localStorage.getItem('token');

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if(token) {
    return {
      ...headers,
      Authorization: 'Bearer ' + token
    }
  } else {
    return headers;
  }

}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}

function parseJSON(response) {
  return response.json();
}

export default function request(url, method = 'GET', data) {

  return fetch(url, {
    method: method,
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
  .then(checkStatus)
  .then(parseJSON)
}


const requestPending = (type) => ({
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

export function requestWrapper(type, url, method = 'GET', data) {
  return (dispatch, getState) => {
    dispatch(requestPending(type));

    request(url, method, data)
    .then(response => {
      dispatch(requestSuccess(type, response));
    })
    .catch(error => {

      error.json()
      .then(errorResp => {

        if(errorResp.name === 'TokenExpiredError') {
          dispatch({type: 'AUTH_ERROR', error: errorResp});

        } else if(errorResp.name === 'JsonWebTokenError') {
          dispatch({type: 'AUTH_ERROR', error: errorResp});

        } else if(errorResp.name === 'missingAuthToken') {
          dispatch({type: 'AUTH_ERROR', error: errorResp});

        } else {
          console.log(errorResp);
          dispatch(requestError(type, errorResp));

        }

      }).catch(error => {
        console.error('unknown error: could not parse error', error);
        dispatch(requestError(type, errorResp));
      });
    })

  }
}
