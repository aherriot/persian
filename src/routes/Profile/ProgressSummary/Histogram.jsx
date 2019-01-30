import React, { PureComponent } from 'react'

export default class Histogram extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      initialRender: true
    }
  }

  componentDidMount() {
    this.timeoutRef = window.setTimeout(() => {
      this.setState({ initialRender: false })
    }, 0)
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeoutRef)
  }

  render() {
    const { words, scores, profile } = this.props

    const scoreHistogram = {}
    for (let i = 0; i <= 7 * 2; i++) {
      scoreHistogram[i] = 0
    }

    let mostFrequentScore = 1 // start at 1 to avoid divide by 0
    let unknownWordCount = 0
    let wordList

    if (words.fetchStatus === 'SUCCESS' && scores.fetchStatus === 'SUCCESS') {
      if (profile.selectedTag) {
        wordList = words.byTag[profile.selectedTag] || []
      } else {
        wordList = Object.keys(words.byId)
      }

      wordList.forEach(wordId => {
        const score = scores.byWordId[wordId]
        let totalScore = 0

        if (score) {
          if (score.fromPersian) {
            totalScore += score.fromPersian.score
          }

          if (score.fromEnglish) {
            totalScore += score.fromEnglish.score
          }
        } else {
          unknownWordCount++
        }

        scoreHistogram[totalScore]++
        if (scoreHistogram[totalScore] > mostFrequentScore) {
          mostFrequentScore = scoreHistogram[totalScore]
        }
      })
    }

    let histogram = []
    for (let score in scoreHistogram) {
      let numWordsAtScore = scoreHistogram[score]

      const barWidth = this.state.initialRender
        ? 0
        : (numWordsAtScore / mostFrequentScore) * 100

      histogram.push(
        <div key={score} className="ProgressSummary__row">
          <div className="ProgressSummary__row-label">{score}</div>
          <div
            className="ProgressSummary__bar"
            style={{ width: barWidth + '%' }}
          />
          <div className="ProgressSummary__row-count">{numWordsAtScore}</div>
        </div>
      )
    }

    // There are libraries than can help with this sort of pluralization
    // but until we need to do this frequently, for now, we can construct
    // sentences like with ternary operators and logical expressions.
    histogram.push(
      <p key="unknownCount">
        There {unknownWordCount === 1 ? 'is' : 'are'}
        {' ' + unknownWordCount + ' '}
        untested word
        {unknownWordCount !== 1 && 's'}
        {profile.selectedTag && ' in this category'} out of{' '}
        {wordList && wordList.length}.
      </p>
    )

    return histogram
  }
}
