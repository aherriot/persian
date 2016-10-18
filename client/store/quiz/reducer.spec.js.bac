import {expect} from 'chai';
import reducer from './reducer';

describe('quiz reducer', () => {
  it('FETCH_SCORES_PENDING', () => {

    const prevState = {
      quizState:'NO_WORDS',
      nextQuizState:null,
      currentWordId:null,
      currentBucket:2,
      filteredWordIds:[],
      previousWordId:null,
      recentWrongIds:[],
      response:null,
      options:{
        fromLang:'english',
        toLang:'phonetic',
        selectionAlgorithm:'LEITNER',
        filter:'',
        typeResponse:true
      }
    };

    const newState = reducer(prevState, {
      type: 'SELECT_WORD',
      payload: {
        seed: 0.5,
        words: {status:'INIT',byId:{},error:{}},
        scores: {status:'INIT',byWordId:{},error:{}}
      }
    });

    expect(newState.currentWordId).to.equal(null);
  });
});
