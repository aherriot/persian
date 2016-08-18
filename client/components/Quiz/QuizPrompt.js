
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import TextResponse from './TextResponse';

class QuizPrompt extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(!this.props.options.typeResponse) {
      let checkButton = findDOMNode(this.refs.checkButton);
      if(checkButton) {
        checkButton.focus();
      }
    }
  }

  onCheckClicked = (e) => {
    e.preventDefault();
    this.props.selfEvaluate();
  }

  getResponseComponent = () => {
    if(this.props.options.typeResponse) {
      return (
        <TextResponse
          options={this.props.options}
          checkWord={this.props.checkWord}
        />
      )
    } else {
      return (
        <div>
          <button ref="checkButton" onClick={this.onCheckClicked}>
            Check
          </button>
        </div>
      )
    }
  }

  render() {

    const {word, options} = this.props;

    return (
      <div>
        {word[options.fromLang]}
        {this.getResponseComponent()}
      </div>
    );
  }
}

QuizPrompt.propTypes = {
  selfEvaluate: React.PropTypes.func.isRequired
};

export default QuizPrompt;
