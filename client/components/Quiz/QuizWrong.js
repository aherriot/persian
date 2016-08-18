import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import {thirdSide, quizEqual} from '../../utils/';


class QuizWrong extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nextEnabled: false
    };
  }

  componentDidMount() {
    if(!this.props.typeResponse) {
      let nextLink = findDOMNode(this.refs.nextLink);
      if(nextLink) {
        nextLink.focus();
      }
    } else {
      let retypeInput = findDOMNode(this.refs.retypeInput);
      if(retypeInput) {
        retypeInput.focus();
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.nextEnabled && prevState.nextEnabled !== this.state.nextEnabled) {
      let nextLink = findDOMNode(this.refs.nextLink);
      if(nextLink) {
        nextLink.focus();
      }
    }
  }

  onSelectNextWord = (e) => {
    e.preventDefault();
    this.props.selectWord();
  }

  onUndoMarkWrong = (e) => {
    e.preventDefault();
    this.props.undoMarkWrong();
  }

  onRetypeChanged = (e) => {
    if(quizEqual(this.props.word[this.props.toLang], this.refs.retypeInput.value)) {
      this.setState({nextEnabled: true});
    }
  }

  render() {

    return (
      <div className="answerArea">
        <div>
          <span>Response: </span>
          <span className="red">{this.props.response}</span>
        </div>
        <div>
          <span>Answer: </span>
          <span className="green">{this.props.word[this.props.toLang]}</span>&nbsp;
          <span className="">({this.props.word[thirdSide(this.props.fromLang, this.props.toLang)]})</span>
        </div>
        <div>

          <input type="text"
            ref="retypeInput"
            onChange={this.onRetypeChanged}
            disabled={this.state.nextEnabled}
            placeholder="type correct answer">
          </input>

          <button
            ref="nextLink"
            disabled={!this.state.nextEnabled}
            onClick={this.onSelectNextWord}>
            Next
          </button>

          <br />
          <a href="#" className="right" onClick={this.onUndoMarkWrong}>I Mistyped</a>
        </div>
      </div>
    );
  }

};

QuizWrong.propTypes = {
  response: React.PropTypes.string.isRequired,
  undoMarkWrong: React.PropTypes.func.isRequired,
};

export default QuizWrong;
