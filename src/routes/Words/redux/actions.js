export function openFilterModal() {
  return {
    type: 'words/OPEN_FILTER_MODAL'
  }
}

export function closeFilterModal() {
  return {
    type: 'words/CLOSE_FILTER_MODAL'
  }
}

export function openAddModal() {
  return {
    type: 'words/OPEN_ADD_MODAL'
  }
}

export function closeAddModal() {
  return {
    type: 'words/CLOSE_ADD_MODAL'
  }
}

export function selectWord(wordId) {
  return {
    type: 'words/SELECT_WORD',
    payload: { wordId }
  }
}

export function deselectWord() {
  return {
    type: 'words/DESELECT_WORD'
  }
}

export function editWord() {
  return {
    type: 'words/EDIT_WORD'
  }
}

export function cancelEditWord() {
  return {
    type: 'words/CANCEL_EDIT_WORD'
  }
}

export function setSearchText(text = '') {
  return {
    type: 'words/SET_SEARCH_TEXT',
    payload: {
      searchText: text
    }
  }
}

export function setSortBy(sortBy) {
  return {
    type: 'words/SET_SORT_BY',
    payload: {
      sortBy: sortBy
    }
  }
}
