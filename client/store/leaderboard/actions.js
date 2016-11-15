import {authRequest} from 'utils/request';

export function fetchLeaderboard() {
  return authRequest('FETCH_LEADERBOARD', '/api/users/leaderboard');
}
