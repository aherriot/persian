export default {
  MIN_BUCKET: 0,
  MAX_BUCKET: 5,
  MAX_RECENT_WRONG_LENGTH: 3,

  LEITNER: 'LEITNER',
  RANDOM: 'RANDOM',
  NEWEST: 'NEWEST',
  OLDEST: 'OLDEST',

  //enum for properties of each word.
  ENGLISH: 'english',
  PERSIAN: 'persian',
  PHONETIC: 'phonetic',
  TAGS: 'tags',
  SCORES: 'scores',

  //score mappings (E_TO_P means english to persian, ...)
  E_TO_P: 0,
  E_TO_PH: 1,
  P_TO_E: 2,
  P_TO_PH: 3,
  PH_TO_E: 4,
  PH_TO_P: 5,

  //sort direction
  ASCENDING: 1,
  DESCENDING: -1,
  ORIGINAL_ORDER: 2,

}
