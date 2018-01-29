import thirdSide from './thirdSide'

describe('thirdSide', () => {
  it('english and persian', () => {
    expect(thirdSide('english', 'persian')).toEqual('phonetic')
  })

  it('english and phonetic', () => {
    expect(thirdSide('english', 'phonetic')).toEqual('persian')
  })

  it('persian and english', () => {
    expect(thirdSide('persian', 'english')).toEqual('phonetic')
  })

  it('persian and phonetic', () => {
    expect(thirdSide('persian', 'phonetic')).toEqual('english')
  })

  it('phonetic and english', () => {
    expect(thirdSide('phonetic', 'english')).toEqual('persian')
  })

  it('phonetic and persian', () => {
    expect(thirdSide('phonetic', 'persian')).toEqual('english')
  })
})
