'use strict';

import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

class QuizResponse extends Component {

  constructor() {
    super();

    this.state = {
      submitEnabled: false
    }
  }

  componentDidMount() {
    let responseInput = findDOMNode(this.refs.responseInput);
    if(responseInput) {
      responseInput.focus();
    }
  }

  onKeyDown = (event) => {
    if(event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onChange = (event) => {
    if(event.target.value.length > 0) {
      this.setState({submitEnabled: true});
    } else {
      this.setState({submitEnabled: false});
    }
  }

  onSubmit = (event) => {
    if(event) {
      event.preventDefault();
    }

    if(this.state.submitEnabled) {
      let response = findDOMNode(this.refs.responseInput);
      this.props.onSubmitResponse(response.value);
    }
  }

  render() {
    return (
      <div className="responseArea">
        <form onSubmit={this.onSubmit}>

          <input type="text"
            id="responseInput"
            autoComplete="off"
            ref="responseInput"
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}>
          </input>
          <label htmlFor="responseInput"></label>

          <input type="submit"
            ref="checkButton"
            disabled={!this.state.submitEnabled}>

          </input>
        </form>
      </div>
    );
  }

};

QuizResponse.propTypes = {
  onSubmitResponse: React.PropTypes.func.isRequired
};

export default QuizResponse;
