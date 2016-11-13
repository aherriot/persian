import {authRequest} from 'utils/request';

export function fetchScores() {
  return authRequest('FETCH_SCORES', '/api/scores/');
}

export function setScore(wordId, index, score) {
  return authRequest('SET_SCORE', '/api/scores/' + wordId, 'PUT', {index: index, score: score})
}
