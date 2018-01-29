import checkAnswer from './checkAnswer'

describe('checkAnswer', () => {
  it('Simple comparison', () => {
    expect(checkAnswer('abc', 'abc')).toBeTruthy()
  })

  it('case-insensitive response', () => {
    expect(checkAnswer('Abc', 'abc')).toBeTruthy()
  })

  it('case-insensitive answer', () => {
    expect(checkAnswer('abc', 'Abc')).toBeTruthy()
  })

  it('wrong answer', () => {
    expect(checkAnswer('def', 'abc')).toBeFalsy()
  })

  it('ignores content in parens', () => {
    expect(checkAnswer('abc', 'abc (clarification)')).toBeTruthy()
  })

  it('ignores whitespace', () => {
    expect(checkAnswer('abcdef', 'abc def')).toBeTruthy()
  })

  it('accepts first response from slash seprated answer', () => {
    expect(checkAnswer('abc', 'Abc / Def')).toBeTruthy()
  })

  it('accepts second response from slash seprated answer', () => {
    expect(checkAnswer('def', 'Abc / Def')).toBeTruthy()
  })
})
