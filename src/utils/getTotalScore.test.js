import getTotalScore from './getTotalScore'

const scores = {
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

describe('getTotalScore', () => {
  it('return null with missing score object', () => {
    expect(getTotalScore('0', scores)).toEqual(null)
  })

  it('score in both directions', () => {
    expect(getTotalScore('1', scores)).toEqual(2)
  })

  it('fromEnglish score only', () => {
    expect(getTotalScore('2', scores)).toEqual(3)
  })

  it('fromPersian score only', () => {
    expect(getTotalScore('3', scores)).toEqual(4)
  })
})
