'use strict';

import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';


class TextResponse extends Component {

  constructor(props) {
    super(props);

    this.state = {
      submitEnabled: !this.props.options.typeResponse
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
      this.onSubmit(event);
    }
  }

  onChange = (event) => {
    if(event.target.value.length > 0) {
      this.setState({submitEnabled: true});
    } else {
      this.setState({submitEnabled: false});
    }
  }

  onSubmit = (e) => {    
    if(e) {
      e.preventDefault();
    }

    if(this.state.submitEnabled) {
      this.props.checkWord(findDOMNode(this.refs.responseInput).value);
    }
  }

  render() {
    return (
      <div className="responseArea">
        <form>

          {this.props.options.typeResponse &&
            <input type="text"
              id="responseInput"
              autoComplete="off"
              ref="responseInput"
              onKeyDown={this.onKeyDown}
              onChange={this.onChange}>
            </input>
          }

          <button
            ref="checkButton"
            disabled={!this.state.submitEnabled}
            onClick={this.onSubmit}>
            Check
          </button>
        </form>
      </div>
    );
  }

};

TextResponse.propTypes = {
};

export default TextResponse;
