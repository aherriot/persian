// match anything in paranthesis or any punctuation or white
// used to strip out noise and compare just the letters in quiz
const stripRegex = /(\(.*?\)|[!.?,'";\-\s]+)/gi

export default function checkAnswer(response, answer) {
  const answers = answer.split('/')
  const cleanedResponse = response.replace(stripRegex, '').toLowerCase()

  return answers.some(answer => {
    const cleanedAnswer = answer.replace(stripRegex, '').toLowerCase()
    return cleanedResponse === cleanedAnswer
  })
}
