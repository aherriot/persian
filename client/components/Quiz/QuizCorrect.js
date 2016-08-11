import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import {thirdSide} from '../../utils/';

class QuizCorrect extends Component {

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

  render() {

    return (
      <div className="answerArea">
        Correct: {' '}
        {this.props.word[this.props.toLang]} {' '}
        <span className="">({this.props.word[thirdSide(this.props.fromLang, this.props.toLang)]})</span>

        <div>
          <a href="#" ref="nextLink" onClick={this.onSelectNextWord}>Next</a>
        </div>
      </div>
    );
  }

};

QuizCorrect.propTypes = {
  response: React.PropTypes.string.isRequired,
  word: React.PropTypes.object.isRequired,
  fromLang: React.PropTypes.string.isRequired,
  toLang: React.PropTypes.string.isRequired

};

export default QuizCorrect;
