import constants from '../constants/constants';

export function thirdSide(fromLang, toLang) {
  if(fromLang === constants.ENGLISH) {
    if(toLang === constants.PERSIAN) {
      return constants.PHONETIC;
    } else {
      return constants.PERSIAN;
    }
  } else if(fromLang === constants.PERSIAN) {
    if(toLang === constants.ENGLISH) {
      return constants.PHONETIC;
    } else {
      return constants.ENGLISH;
    }
  } else {
    if(toLang === constants.ENGLISH) {
      return constants.PERSIAN;
    } else {
      return constants.ENGLISH;
    }
  }
}


// match anything in paranthesis or any punctuation or white
// used to strip out noise and compare just the letters in quiz
const stripRegex = /(\(.*?\)|[!\.\?,'";\-\s]+)/gi;

export function quizEqual(word1, word2) {

  const words1 = word1.split('/');
  const words2 = word2.split('/');

  return words1.some(word1 => {
    word1 = word1.replace(stripRegex, '').toLowerCase();
    return words2.some(word2 => {
      word2 = word2.replace(stripRegex, '').toLowerCase();
      return (word1 === word2);
    });

  });
}

export function pick(o, ...fields) {
  return Object.assign({}, ...(for (p of fields) {[p]: o[p]}));
}

export function getScoreIndex(fromLang, toLang) {
  return constants[fromLang + '_' + toLang];
}

export function filterWords(words, scores, options, currentBucket) {

  const scoreIndex = getScoreIndex(options.fromLang, options.toLang);

  const filteredWords =  Object.keys(words).filter(wordId => {

    let word = words[wordId]

    if(options.selectionAlgorithm === constants.LEITNER) {
      let score = 0;

      //Look up the associated score, otherwise, default to 0
      if(scores[word._id]) {
        score = scores[word._id].scores[scoreIndex];
      }

      if(score !== currentBucket) {
        return false;
      }
    }

    // if the tags do not contain the filter text
    if(options.filter.length > 0) {
      if(word.tags.every(tag => !tag.includes(options.filter))) {
        return false;
      }
    }

    return true;
  });

  return filteredWords;
}

export function selectLeitner(list, seed, previousWordId, recentWrongIds, quizOptions) {

  // search through word list from lowest score upwards until we find a word.

  if(list.length) {
    return list[Math.floor(seed*list.length)];
  } else {
    return null; //no word match
  }

}

export function selectRandom(list, seed, previousWordId, recentWrongIds, quizOptions) {

  // search through word list from lowest score upwards until we find a word.
  const filteredList = list.filter((word) => {
      //Don't show the same word twice in a row
    if (previousWordId === word._id) {
      return false;
    }

    // if already in recent wrong list, don't use.
    if(recentWrongIds.includes(word._id)) {
      return false;
    }

    return true;
  });

  if(filteredList.length) {
    return filteredList[Math.floor(seed*filteredList.length)];
  } else {
    return null; //no word match
  }
}

export function selectLeastRecent(list, seed, previousWordId, recentWrongIds, quizOptions) {

  // search through word list from lowest score upwards until we find a word.
  const filteredList = list.filter((word) => {
      //Don't show the same word twice in a row
    if (previousWordId === word._id) {
      return false;
    }

    // if already in recent wrong list, don't use.
    if(recentWrongIds.includes(word._id)) {
      return false;
    }

    return true;
  });

  let leastRecentWord = null;
  filteredList.forEach(word => {

    if(!leastRecentWord || !word.quizzedAt || word.quizzedAt < leastRecentWord.quizzedAt) {
      leastRecentWord = word;
    }
  })

  return leastRecentWord;

}

export function enumFromArray(array) {
  if(!Array.isArray(array)) {
    console.error('enumFromArray expected argument to be an array.');
  }

  let obj;
  array.forEach(elem =>{
    obj[elem] = elem;
  })

  return obj;
}
