import React, { PureComponent } from 'react'
import Modal from 'commonComponents/Modal'
import XIcon from 'icons/X'

// function onSubmit(e) {
//   e.preventDefault()
//   actions.closeFilterModal()
// }

export default class FilterModal extends PureComponent {
  constructor(props) {
    super(props)
    this.searchFieldRef = React.createRef()
  }

  render() {
    const { open, actions, searchText, sortBy, tagFilter, words } = this.props

    return (
      <Modal open={open} onClose={actions.closeFilterModal} title="Find">
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault()
            actions.closeFilterModal()
          }}>
          <div className="form__body">
            <div className="form__group">
              <label htmlFor="search">Search</label>
              <div className="form__action-group">
                <input
                  id="search"
                  type="text"
                  value={searchText}
                  onChange={e => actions.setSearchText(e.target.value)}
                  autoFocus
                  ref={this.searchFieldRef}
                />
                <div
                  className="form__action"
                  onClick={() => {
                    actions.setSearchText('')
                    this.searchFieldRef.current.focus()
                  }}>
                  <XIcon fill={searchText.length > 0 ? '#888' : '#bbb'} />
                </div>
              </div>
            </div>
            <div className="form__group">
              <label htmlFor="sortDirection">Sort By</label>
              <select
                id="sortDirection"
                value={sortBy}
                onChange={e => actions.setSort(e.target.value, 'ASC')}>
                <option value="english">English</option>
                <option value="persian">Persian</option>
                <option value="phonetic">Phonetic</option>
                <option value="score">Score</option>
                <option value="createdAt">Date Added</option>
                <option value="mostRecentlyStudied">
                  Most Recently Studied
                </option>
              </select>
            </div>
            <div className="form__group">
              <label htmlFor="tag">Filter by Tag</label>
              <div className="form__action-group">
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
                          {tag} ({words.byTag[tag].length})
                        </option>
                      )
                    })}
                </select>
                <div
                  className="form__action"
                  onClick={() => {
                    actions.setTagFilter('')
                    this.searchFieldRef.current.focus()
                  }}>
                  <XIcon fill={tagFilter.length > 0 ? '#888' : '#bbb'} />
                </div>
              </div>
            </div>
            {/* TODO: for small screens, maybe we can toggle showing the
                  the phonetic persian instead of the persian characters.
                  to be implemented...
              <div className="form__group">
                <input type="checkbox" id="phonetic" />
                <label htmlFor="phonetic">Show Phonetic</label>
              </div> */}
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
}
