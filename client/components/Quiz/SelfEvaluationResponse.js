import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import {thirdSide} from '../../utils/';


class SelfEvaluationResponse extends Component {
  constructor(props) {
    super(props);
  }

  onCheckClicked = (e) => {
    e.preventDefault();
    this.setState({revealAnswer: true});
  }

  onRightClicked = (e) => {
    e.preventDefault();
    this.props.markCorrect(this.props.word);
  }

  onWrongClicked = (e) => {
    e.preventDefault();
    this.props.markWrong('', this.props.word);

  }

  render() {
    return (
      <div>
        {this.props.word[this.props.options.fromLang]}
        <br />
        {this.props.word[this.props.options.toLang]}
        {' '}
        <span className="">({this.props.word[thirdSide(this.props.options.fromLang, this.props.options.toLang)]})</span>
        <br />
        <button ref="rightButton" onClick={this.onRightClicked}>
          Right
        </button>
        {' '}
        <button ref="wrongButton" onClick={this.onWrongClicked}>
          Wrong
        </button>
      </div>
    )
  }
}

SelfEvaluationResponse.propTypes = {
  markCorrect: React.PropTypes.func.isRequired,
  markWrong: React.PropTypes.func.isRequired,
}

export default SelfEvaluationResponse;
