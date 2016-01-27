const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function buildHeaders() {
  const authToken = localStorage.getItem('authToken');

  return { ...defaultHeaders, Authorization: authToken };
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export function httpGet(url) {

  return fetch(url, {
    headers: buildHeaders(),
  })
  .then(checkStatus)
  .then(parseJSON)
  .catch(err => {
    if(err.response) {
      err.response.json()
      .then(errorJSON => {throw new Error(errorJSON)});
    } else {
      throw new Error(err.toString());
    }
  })
}

export function httpPut(url, data) {

  return fetch(url, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(data)
  })
  .then(checkStatus)
  .then(parseJSON)
  .catch(err => {
    if(err.response) {
      err.response.json()
      .then(errorJSON => {throw new Error(errorJSON)});
    } else {
      throw new Error(err.toString());
    }
  })
}


export function httpPost(url, data) {

  return fetch(url, {
    method: 'POST',
    headers: buildHeaders(),
    body:JSON.stringify(data)
  })
  .then(checkStatus)
  .then(parseJSON)
  .catch(err => {
    if(err.response) {
      err.response.json()
      .then(errorJSON => {throw new Error(errorJSON)});
    } else {
      throw new Error(err.toString());
    }
  })
}

export function httpDelete(url) {
  const authToken = localStorage.getItem('phoenixAuthToken');

  return fetch(url, {
    method: 'DELETE',
    headers: buildHeaders()
  })
  .then(checkStatus)
  .then(parseJSON)
  .catch(err => {
    if(err.response) {
      err.response.json()
      .then(errorJSON => {throw new Error(errorJSON)});
    } else {
      throw new Error(err.toString());
    }
  })
}
