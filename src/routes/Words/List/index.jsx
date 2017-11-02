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

  noRowsRenderer = () => {
    const { status } = this.props
    if (status === 'PENDING') {
      return <div className="noRows">Loading...</div>
    } else {
      return <div className="noRows">No rows match filter</div>
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.words !== newProps.words) {
      this.list.forceUpdateGrid()
    }
  }

  render() {
    return (
      <div className="List">
        <ReactVirtualizedAutoSizer>
          {({ width, height }) => (
            <ReactVirtualizedList
              ref={ref => (this.list = ref)}
              width={width}
              height={height}
              rowCount={this.props.words.length}
              rowHeight={25}
              rowRenderer={this.rowRenderer}
              noRowsRenderer={this.noRowsRenderer}
            />
          )}
        </ReactVirtualizedAutoSizer>
      </div>
    )
  }
}
