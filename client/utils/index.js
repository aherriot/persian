import constants from '../constants/constants';

function getHeaders() {
  const token = localStorage.getItem('token');

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
     Authorization: token ? 'Bearer ' + token : undefined
   };
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    //AuthenticationError
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export function request(url, method = 'GET', data) {

  return fetch(url, {
    method: method,
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
  .then(checkStatus)
  .then(parseJSON)
}

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


export function selectLeitnerFromSeed(list, seed, previousWordId, recentWrongIds, quizOptions) {

  //filter previousWordId from recentWrongIds
  const filteredRecentWrong = recentWrongIds.filter(wordId => wordId !== previousWordId);

  //select from recentWrongIds
  const recentWrongThreshold = filteredRecentWrong.length / constants.MAX_RECENT_WRONG_LENGTH;
  if(seed < recentWrongThreshold) {
    const newSeed = seed / recentWrongThreshold;
    const wordId = filteredRecentWrong[Math.floor(newSeed*filteredRecentWrong.length)];
    return list.find(word => word._id === wordId);
  } else {
    // search through word list from lowest score upwards until we find a word.

    let bucketIndex = 0;
    let bucket = [];
    const scoreIndex = getScoreIndex(quizOptions.fromLang, quizOptions.toLang);


    while(bucket.length === 0 && bucketIndex <= constants.MAX_BUCKET) {
      bucket = list.filter((word) => {
        //Don't show the same word twice in a row
        if (previousWordId === word._id) {
          return false;
        }

        //if it is in a different bucket
        if(word.scores[scoreIndex] !== bucketIndex) {
          return false;
        }

        // if already in recent wrong list, don't use.
        if(recentWrongIds.includes(word._id)) {
          return false;
        }

        // if the tags do not contain the filter text
        if(quizOptions.filter.length > 0) {
          if(word.tags.every(tag => !tag.includes(quizOptions.filter))) {
            return false;
          }
        }

        return true;
      });
      bucketIndex++;
    }

    if(bucket.length) {
      return bucket[Math.floor(seed*bucket.length)];
    } else {
      return null; //no word match
    }
  }
}

export function selectRandomFromSeed(list, seed, previousWordId, recentWrongIds, quizOptions) {

  //filter previousWordId from recentWrongIds
  const filteredRecentWrong = recentWrongIds.filter(wordId => wordId !== previousWordId);

  const recentWrongThreshold = filteredRecentWrong.length / constants.MAX_RECENT_WRONG_LENGTH;
  if(seed < recentWrongThreshold) {
    const newSeed = seed / recentWrongThreshold;
    const wordId = filteredRecentWrong[Math.floor(newSeed*filteredRecentWrong.length)];
    return list.find(word => word._id === wordId);
  } else {
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

      //If the tags do not contain the filter text
      if(quizOptions.filter.length > 0) {
        if(word.tags.every(tag => !tag.includes(quizOptions.filter))) {
          return false;
        }
      }

      return true;
    });

    if(filteredList.length) {
      return filteredList[Math.floor(seed*filteredList.length)];
    } else {
      return null; //no word match
    }
  }
}
