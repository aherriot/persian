import { authRequest } from 'utils/request'

export function fetchScores() {
  return authRequest('scores/FETCH', '/api/scores')
}

export function updateScore(scoreId, questionSide, score) {
  return authRequest('scores/UPDATE', '/api/scores/' + scoreId, 'PUT', {
    direction: questionSide,
    score: score
  })
}
