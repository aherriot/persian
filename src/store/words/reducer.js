const actionHandlers = {
  'words/FETCH_PENDING': (state, action) => {
    return { ...state, fetchStatus: 'PENDING' }
  },
  'words/FETCH_SUCCESS': (state, action) => {
    const byTag = {}
    // normalize the words by id, for fast lookup with a word id.
    const byId = action.payload.response.reduce((acc, word, index) => {
      // Also category the words by tags for fast lookup by category tag
      word.tags.forEach(function(tag) {
        if (byTag[tag]) {
          byTag[tag].push(word._id)
        } else {
          byTag[tag] = [word._id]
        }
      })

      acc[word._id] = word
      return acc
    }, {})
    return {
      ...state,
      fetchStatus: 'SUCCESS',
      fetchTime: Date.now(),
      byId: byId,
      byTag: byTag,
      error: null
    }
  },
  'words/FETCH_ERROR': (state, action) => {
    return { ...state, fetchStatus: 'ERROR', error: action.error }
  },
  'words/ADD_PENDING': (state, action) => {
    return { ...state, modifyStatus: 'PENDING' }
  },
  'words/ADD_SUCCESS': (state, action) => {
    const newWord = action.payload.response

    const updatedTags = {}

    // find tags to add
    newWord.tags.forEach(updatedTag => {
      updatedTags[updatedTag] = state.byTag[updatedTag]
        ? [...state.byTag[updatedTag], newWord._id]
        : [newWord._id]
    })

    return {
      ...state,
      modifyStatus: 'SUCCESS',
      byId: {
        ...state.byId,
        [newWord._id]: newWord
      },
      byTag: { ...state.byTag, ...updatedTags }
    }
  },
  'words/ADD_ERROR': (state, action) => {
    return { ...state, modifyStatus: 'ERROR', error: action.error }
  },
  'words/UPDATE_PENDING': (state, action) => {
    return { ...state, modifyStatus: 'PENDING' }
  },
  'words/UPDATE_SUCCESS': (state, action) => {
    const updatedWord = action.payload.response
    const originalWord = state.byId[updatedWord._id]

    // Object containing tag to word mappings that have changed
    const updatedTags = {}
    const emptyTags = []

    // Find tags to remove
    originalWord.tags.forEach(originalTag => {
      // if a tag was removed
      if (!updatedWord.tags.includes(originalTag)) {
        updatedTags[originalTag] = state.byTag[originalTag].filter(
          wordId => wordId !== updatedWord._id
        )

        // if no words have this tag now, then clear the tag key
        if (updatedTags[originalTag].length === 0) {
          emptyTags.push(originalTag)
        }
      }
    })

    // find tags to add
    updatedWord.tags.forEach(updatedTag => {
      // if a tag was added
      if (!originalWord.tags.includes(updatedTag)) {
        updatedTags[updatedTag] = state.byTag[updatedTag]
          ? [...state.byTag[updatedTag], updatedWord._id]
          : [updatedWord._id]
      }
    })

    // Finally, we clear out the tags that no longer have words
    // We do this separately because object-spread notation does not
    // let us exclude tags.
    const byTag = { ...state.byTag, ...updatedTags }
    emptyTags.forEach(emptyTag => {
      delete byTag[emptyTag]
    })

    return {
      ...state,
      modifyStatus: 'SUCCESS',
      byId: { ...state.byId, [updatedWord._id]: updatedWord },
      byTag: byTag
    }
  },
  'words/UPDATE_ERROR': (state, action) => {
    return { ...state, modifyStatus: 'ERROR', error: action.error }
  },
  'words/DELETE_PENDING': (state, action) => {
    return { ...state, modifyStatus: 'PENDING' }
  },
  'words/DELETE_SUCCESS': (state, action) => {
    const deletedWord = action.payload.response

    // Object containing tag to word mappings that have changed
    const updatedTags = {}
    const emptyTags = []

    // Find tags to remove
    deletedWord.tags.forEach(deletedTag => {
      updatedTags[deletedTag] = state.byTag[deletedTag].filter(
        wordId => wordId !== deletedWord._id
      )

      // if no words have this tag now, then clear the tag key
      if (updatedTags[deletedTag].length === 0) {
        emptyTags.push(deletedTag)
      }
    })

    // Finally, we clear out the tags that no longer have words
    // We do this separately because object-spread notation does not
    // let us exclude tags.
    const byTag = { ...state.byTag, ...updatedTags }
    emptyTags.forEach(emptyTag => {
      delete byTag[emptyTag]
    })

    const { [deletedWord._id]: _, ...remainingIds } = state.byId

    return {
      ...state,
      modifyStatus: 'PENDING',
      byId: remainingIds,
      byTag: byTag
    }
  },
  'words/DELETE_ERROR': (state, action) => {
    return { ...state, modifyStatus: 'ERROR', error: action.error }
  }
}

const defaultState = {
  fetchStatus: 'INIT',
  fetchTime: null,
  modifyStatus: 'INIT',
  byId: {},
  byTag: {},
  error: null
}

export default function(state = defaultState, action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
