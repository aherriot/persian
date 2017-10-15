import React, { Component } from 'react'
import classnames from 'classnames'
import ReactVirtualizedList from 'react-virtualized/dist/es/List'
import ReactVirtualizedAutoSizer from 'react-virtualized/dist/es/AutoSizer'
import './List.css'

export default class List extends Component {
  rowRenderer = ({ key, index, style }) => {
    const word = this.props.words[index]
    return (
      <div
        key={key}
        style={style}
        className={classnames('row', { odd: index % 2 === 0 })}
        onClick={() => this.props.actions.selectWord(word._id)}>
        <div>{word.english}</div>
        <div className="rtl">{word.persian}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="List">
        <ReactVirtualizedAutoSizer>
          {({ width, height }) => (
            <ReactVirtualizedList
              width={width}
              height={height}
              rowCount={this.props.words.length}
              rowHeight={25}
              rowRenderer={this.rowRenderer}
            />
          )}
        </ReactVirtualizedAutoSizer>
      </div>
    )
  }
}
