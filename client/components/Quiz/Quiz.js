import React, {Component} from 'react';

import QuizResponse from './QuizResponse';
import QuizResults from './QuizResults';

export default class Quiz extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.words.hasLoaded) {
      this.props.actions.selectWord();
    } else {
      this.props.actions.fetchWords();
    }
  }

  onCorrect = () => {
    this.props.actions.markCorrect(this.props.quiz.currentWord);
  }

  onWrong = () => {
    this.props.actions.markWrong(this.props.quiz.currentWord);
  }

  onSubmitResponse = (response) => {
    this.props.actions.checkWord(response);
  }

  render() {
    return (
      <div>
        <div>isQuizzing: {JSON.stringify(this.props.quiz.isQuizzing)}</div>
        {() => {
          if(this.props.quiz.currentWord && this.props.quiz.isQuizzing) {
            return (
              <div>
                {this.props.quiz.currentWord.english} {this.props.quiz.currentWord.scores}
                <QuizResponse onSubmitResponse={this.onSubmitResponse} />
              </div>
            );
          } else {
            return (
              <div>
                <QuizResults
                  selectWord={this.props.actions.selectWord}
                  isCorrect={this.props.quiz.isCorrect}
                  response={this.props.quiz.response}
                />
              </div>
            );
          }
        }()}

        <pre>{JSON.stringify(this.props.quiz, null, ' ')}</pre>
      </div>
    );
  }
}
Quiz.propTypes = {
  // quiz: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};
