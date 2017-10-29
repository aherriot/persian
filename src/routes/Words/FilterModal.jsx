import React from 'react'
import Modal from 'components/Modal'

export default function FilterModal({ open, actions, searchText, sortBy }) {
  return (
    <Modal open={open} onClose={actions.closeFilterModal}>
      <form>
        <h3>Filter</h3>
        <div>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="search"
            value={searchText}
            onChange={e => actions.setSearchText(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sortDirection">Sort By:</label>
          <select
            id="sortDirection"
            value={sortBy}
            onChange={e => actions.setSortBy(e.target.value)}>
            <option value="english">English</option>
            <option value="persian">Persian</option>
            <option value="phonetic">Phonetic</option>
          </select>
        </div>
        <div>
          <input type="checkbox" id="phonetic" />
          <label htmlFor="phonetic">phonetic</label>
        </div>

        <div>
          <button
            type="button"
            className="button"
            onClick={actions.closeFilterModal}>
            Ok
          </button>
        </div>
      </form>
    </Modal>
  )
}
