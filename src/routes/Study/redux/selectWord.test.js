import selectWord from './selectWord'

const words = {
  fetchStatus: 'SUCCESS',
  byId: {
    '1': { id: '1' },
    '2': { id: '2' },
    '3': { id: '3' },
    '4': { id: '4' },
    '5': { id: '5' },
    '6': { id: '6' },
    '7': { id: '7' }
  },
  byTag: {
    a: ['1', '2', '3'],
    b: ['4', '5', '6'],
    c: ['3', '4']
  }
}

const scores = {
  fetchStatus: 'SUCCESS',
  byWordId: {
    '1': {
      fromEnglish: {
        quizzedAt: '2017-11-25T12:30:15.000Z',
        score: 1
      },
      fromPersian: {
        quizzedAt: '2017-11-24T12:30:15.000Z',
        score: 1
      }
    },
    '2': {
      fromEnglish: {
        quizzedAt: '2017-11-22T12:30:15.000Z',
        score: 3
      }
    },
    '3': {
      fromPersian: {
        quizzedAt: '2017-11-23T12:30:15.000Z',
        score: 4
      }
    }
  }
}

describe('selectWord', () => {
  describe('random', () => {
    const state = {
      options: {
        algorithm: 'RANDOM',
        questionSide: 'english',
        answerSide: 'persian',
        tagFilter: '',
        alternateSides: false
      },
      isEvaluating: true,
      selectedWordId: null
    }

    const action = {
      payload: {
        seed: 0.5,
        words: words,
        scores: scores,
        currentTime: 1511353815000
      }
    }
    it('return null with missing score object', () => {
      const newState = selectWord(state, action)
      expect(newState).toEqual({
        isEvaluating: false,
        options: {
          algorithm: 'RANDOM',
          alternateSides: false,
          answerSide: 'persian',
          questionSide: 'english',
          tagFilter: ''
        },
        selectedWordId: '1'
      })
    })
  })
})
