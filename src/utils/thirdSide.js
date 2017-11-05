// Each word has three sides: english, persian, and phonetic.
// This function returns the key of the remaining side, given other two
// which is useful for providing extra info when revealing quiz answer
export default function(questionSide, answerSide) {
  if (questionSide === 'english') {
    if (answerSide === 'persian') {
      return 'phonetic'
    } else {
      return 'persian'
    }
  } else if (questionSide === 'persian') {
    if (answerSide === 'english') {
      return 'phonetic'
    } else {
      return 'english'
    }
  } else {
    if (answerSide === 'english') {
      return 'persian'
    } else {
      return 'english'
    }
  }
}
