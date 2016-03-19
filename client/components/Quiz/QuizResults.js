import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import {thirdSide} from '../../utils/';


class QuizResults extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let nextLink = findDOMNode(this.refs.nextLink);
    if(nextLink) {
      nextLink.focus();
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

  render() {
    let content;

    if(this.props.isCorrect) {
      content = (
        <div>
          Correct: {' '}
          {this.props.word[this.props.toLang]} {' '}
          <span className="">({this.props.word[thirdSide(this.props.fromLang, this.props.toLang)]})</span>

        </div>
      );
    } else {
      content = (
        <div>
          <a href="#" className="right" onClick={this.onUndoMarkWrong}>I Mistyped</a>
          <div>
            <span>Response: </span>
            <span className="red">{this.props.response}</span>
          </div>
          <div>
            <span>Answer: </span>
            <span className="green">{this.props.word[this.props.toLang]}</span>&nbsp;
            <span className="">({this.props.word[thirdSide(this.props.fromLang, this.props.toLang)]})</span>

          </div>
        </div>
      );
    }

    return (
      <div className="answerArea">
        {content}
        <div>
          <a href="#" ref="nextLink" onClick={this.onSelectNextWord}>Next</a>
        </div>
      </div>
    );
  }

};

QuizResults.propTypes = {
  isCorrect: React.PropTypes.bool.isRequired,
  response: React.PropTypes.string.isRequired,
  undoMarkWrong: React.PropTypes.func.isRequired,
};

export default QuizResults;
