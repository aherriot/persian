import React, { PureComponent } from 'react'
import classnames from 'classnames'

export default class MultipleChoiceOption extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    this.timeoutRef = window.setTimeout(() => {
      this.setState({ mounted: true })
    }, this.props.index * 30)
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeoutRef)
  }

  render() {
    return (
      <div
        className={classnames('MultipleChoice__choice', {
          'MultipleChoice__choice--persian': this.props.isPersian,
          'MultipleChoice__choice--mounted': this.state.mounted
        })}
        onClick={this.props.onClick}
        tabIndex={0}>
        {this.props.children}
      </div>
    )
  }
}
