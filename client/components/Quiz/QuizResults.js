import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';


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

  onMistype() {

  }

  render() {
    let content;

    if(this.props.isCorrect) {
      content = (
        <div>
          Correct! {this.props.response}
        </div>
      );
    } else {
      content = (
        <div>
          <a href="#" className="right" onClick={this.onMistype}>I Mistyped</a>
          <div>
            <span>Response: </span>
            <span className="red">{this.props.response}</span>
          </div>
          <div>
            <span>Answer: </span>
            <span className="green">{this.props.correctAnswer}</span>&nbsp;
            <span className="">({this.props.thirdSide})</span>
          </div>
        </div>
      );
    }

    return (
      <div className="answerArea">
        {content}
        <div>
          <a href="#"
            ref="nextLink"
             onClick={this.props.selectWord}>Next</a>
        </div>
      </div>
    );
  }

};

QuizResults.propTypes = {
  isCorrect: React.PropTypes.bool.isRequired,
  // response: React.PropTypes.string.isRequired,
  correctAnswer: React.PropTypes.string.isRequired,
  thirdSide: React.PropTypes.string.isRequired
  // actions: React.PropTypes.func.isRequired
};

export default QuizResults;