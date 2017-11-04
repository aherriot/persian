import React from 'react'
import Modal from 'components/Modal'

// function onSubmit(e) {
//   e.preventDefault()
//   actions.closeFilterModal()
// }

export default function FilterModal({
  open,
  actions,
  searchText,
  sortBy,
  tagFilter,
  words
}) {
  return (
    <Modal open={open} onClose={actions.closeFilterModal} title="Filter">
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault()
          actions.closeFilterModal()
        }}>
        <div className="form__body">
          <div className="form__group">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              value={searchText}
              onChange={e => actions.setSearchText(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form__group">
            <label htmlFor="sortDirection">Sort By</label>
            <select
              id="sortDirection"
              value={sortBy}
              onChange={e => actions.setSortBy(e.target.value)}>
              <option value="english">English</option>
              <option value="persian">Persian</option>
              <option value="phonetic">Phonetic</option>
            </select>
          </div>
          <div className="form__group">
            <label htmlFor="tag">Filter by Tag</label>
            <select
              id="tag"
              value={tagFilter}
              onChange={e => actions.setTagFilter(e.target.value)}>
              <option value="">---No Filter---</option>
              {Object.keys(words.byTag)
                .sort()
                .map(function(tag) {
                  return (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  )
                })}
            </select>
          </div>

          <div className="form__group">
            <input type="checkbox" id="phonetic" />
            <label htmlFor="phonetic">Show Phonetic</label>
          </div>
        </div>

        <div className="form__button-row">
          <button
            type="button"
            className="button"
            onClick={actions.closeFilterModal}>
            Okay
          </button>
        </div>
      </form>
    </Modal>
  )
}
