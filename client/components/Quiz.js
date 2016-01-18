import React, {Component} from 'react';

export default class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.props.actions.selectWord();
  }

  render() {
    return (
      <div>{this.props.quiz.currentWord}</div>
    );
  }
}
Quiz.propTypes = {
  quiz: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};
