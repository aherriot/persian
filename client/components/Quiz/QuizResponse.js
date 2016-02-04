'use strict';

import React, {Component} from 'react';

class QuizResponse extends Component {

  getInitialState() {
    return {
      submitEnabled: false
    };
  }

  componentDidMount() {
    let responseInput = React.findDOMNode(this.refs.responseInput);
    if(responseInput) {
      responseInput.focus();
    }
  }

  onKeyDown(event) {
    if(event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onChange(event) {
    if(event.target.value.length > 0) {
      this.setState({submitEnabled: true});
    } else {
      this.setState({submitEnabled: false});
    }
  }

  onSubmit() {
    if(this.state.submitEnabled) {
      let response = React.findDOMNode(this.refs.responseInput);
      this.props.onSubmitResponse(response.value);
    }
  }

  render() {
    return (
      <div className="responseArea">
        <div className="input-field">
          <input type="text"
            id="responseInput"
            ref="responseInput"
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}>
          </input>
          <label htmlFor="responseInput"></label>
        </div>
        <button
          ref="checkButton" 
          className="btn green"
          onClick={this.onSubmit}
          disabled={!this.state.submitEnabled}>check</button>
      </div>
    );
  }

});

QuizResponse.propTypes = {
  onSubmitResponse: React.PropTypes.func.isRequired
};

export default QuizResponse;
