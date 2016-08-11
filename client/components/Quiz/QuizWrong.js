import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import {thirdSide} from '../../utils/';


class QuizWrong extends Component {

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
          <a href="#" ref="nextLink" onClick={this.onSelectNextWord}>Next</a>
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
