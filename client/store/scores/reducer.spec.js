import {expect} from 'chai';
import reducer from './reducer';

describe('scores reducer', () => {
  it('FETCH_SCORES_PENDING', () => {

    const prevState = {
      status: 'INIT',
      byWordId: {},
      error: {}
    };

    const newState = reducer(prevState, {type: 'FETCH_SCORES_PENDING'});

    expect(newState.status).to.equal('PENDING');
  });
});
