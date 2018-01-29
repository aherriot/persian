import getMostRecentStudyDate from './getMostRecentStudyDate'

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
        score: 1
      }
    },
    '3': {
      fromPersian: {
        quizzedAt: '2017-11-23T12:30:15.000Z',
        score: 1
      }
    }
  }
}

describe('getMostRecentStudyDate', () => {
  it('return null with missing score object', () => {
    expect(getMostRecentStudyDate('0', scores)).toEqual(null)
  })

  it('return recent date with word studied in both directions', () => {
    expect(getMostRecentStudyDate('1', scores)).toEqual(
      new Date('2017-11-25T12:30:15.000Z')
    )
  })

  it('return english date', () => {
    expect(getMostRecentStudyDate('2', scores)).toEqual(
      new Date('2017-11-22T12:30:15.000Z')
    )
  })

  it('return persian date', () => {
    expect(getMostRecentStudyDate('3', scores)).toEqual(
      new Date('2017-11-23T12:30:15.000Z')
    )
  })
})
