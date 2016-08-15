export default {
  MIN_BUCKET: 0,
  MAX_BUCKET: 5,
  MAX_RECENT_WRONG_LENGTH: 3,

  LEITNER: 'LEITNER',
  RANDOM: 'RANDOM',
  NEWEST: 'NEWEST',
  LEAST_RECENT: 'LEAST_RECENT',

  //enum for properties of each word.
  ENGLISH: 'english',
  PERSIAN: 'persian',
  PHONETIC: 'phonetic',
  TAGS: 'tags',
  SCORES: 'scores',

  english_persian: 0,
  persian_english: 1,
  english_phonetic: 2,
  phonetic_english: 3,
  persian_phonetic: 4,
  phonetic_persian: 5,

  //sort direction
  ASCENDING: 1,
  DESCENDING: -1,
  ORIGINAL_ORDER: 2,

}
