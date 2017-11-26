import { authRequest } from 'utils/request'

export function fetchLeaderboard() {
  return authRequest('leaderboard/FETCH', '/api/users/leaderboard')
}
