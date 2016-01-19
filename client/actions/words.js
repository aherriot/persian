import * as types from '../constants/actionTypes';
import * as status from '../constants/actionStatus';

function fetchWordsPending() {
  return {
    type: types.FETCH_WORDS,
    status: status.PENDING
  };
}

function fetchWordsSuccess(words) {
  return {
    type: types.FETCH_WORDS,
    status: status.SUCCESS,
    payload: {
      words: words,
      error: {}
    }
  };
}

function fetchWordsFailure(error) {
  return {
    type: types.FETCH_WORDS,
    status: status.FAILURE,
    payload: {
      error: error
    }
  };
}

export function fetchWords() {
  return (dispatch) => {
    dispatch(fetchWordsPending());

    fetch('/api/words')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          dispatch(fetchWordsFailure(data.error));
        } else {
          dispatch(fetchWordsSuccess(data));
        }
      })
      .catch(exception => {
        dispatch(fetchWordsFailure(exception));
      });
  };
}

function addWordPending(word) {
  return {
    type: types.ADD_WORD,
    status: status.PENDING,
    payload: {
      word: word
    }
  };
}

function addWordSuccess(word) {
  return {
    type: types.ADD_WORD,
    status: status.SUCCESS,
    payload: {
      word: word,
      error: {}
    }
  };
}

function addWordFailure(word, error) {
  return {
    type: types.ADD_WORDS,
    status: status.FAILURE,
    payload: {
      word: word,
      error: error
    }
  };
}

export function addWord(word) {
  return (dispatch) => {
    dispatch(addWordPending(word));

    fetch('/api/words', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          dispatch(addWordFailure(data.error));
        } else {
          dispatch(addWordSuccess(data));
        }
      });
  };
}

function deleteWordPending(word) {
  return {
    type: types.DELETE_WORD,
    status: status.PENDING,
    payload: {
      word: {
        id: word.id
      }
    }
  };
}

function deleteWordSuccess() {
  return {
    type: types.DELETE_WORD,
    status: status.SUCCESS,
    payload: {}
  };
}

function deleteWordFailure(word, error) {
  return {
    type: types.DELETE_WORDS,
    status: status.FAILURE,
    payload: {
      word: word,
      error: error
    }
  };
}

export function deleteWord(word) {
  return (dispatch) => {
    dispatch(deleteWordPending(word));

    fetch('/api/words/' + word.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          dispatch(deleteWordFailure(data.error));
        } else {
          dispatch(deleteWordSuccess(data));
        }
      });
  };
}

function editWordPending(word) {
  return {
    type: types.EDIT_WORD,
    status: status.PENDING,
    payload: {
      word: word
    }
  };
}

function editWordSuccess(word) {
  return {
    type: types.EDIT_WORD,
    status: status.SUCCESS,
    payload: {word: word}
  };
}

function editWordFailure(word, error) {
  return {
    type: types.EDIT_WORDS,
    status: status.FAILURE,
    payload: {
      word: word,
      error: error
    }
  };
}

export function editWord(word) {
  return (dispatch) => {
    dispatch(editWordPending(word));
    fetch('/api/words/' + word.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({word: word})
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          dispatch(editWordFailure(data.error));
        } else if (data.status === 'success') {
          dispatch(editWordSuccess(data.word));
        }
      });
  };
}

export function markCorrect(word, languagePair) {

}

export function markWrong(word, languagePair) {

}
