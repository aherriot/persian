import React, {Component} from 'react';

import QuizResponse from './QuizResponse';
import QuizResults from './QuizResults';
import QuizOptions from './QuizOptions';

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

  onSubmitResponse = (response) => {
    this.props.actions.checkWord(response);
  }

  showQuizOptions = (event) => {
    event.preventDefault();
    this.props.actions.showQuizOptions();
  }

  render() {
    return (
      <div>
        {() => {
          if(this.props.quiz.showingOptions) {
            return (
              <QuizOptions
                options={this.props.quiz.options}
                updateQuizOptions={this.props.actions.updateQuizOptions}
              />
            );

          } else if(this.props.quiz.currentWord && this.props.quiz.isQuizzing) {
            return (
              <div>
                <a href="#" onClick={this.showQuizOptions}>Options</a>
                <div>
                  Bucket: {this.props.quiz.currentWord.scores}
                </div>
                {this.props.quiz.currentWord[this.props.quiz.options.fromLang]}

                <QuizResponse onSubmitResponse={this.onSubmitResponse} />
              </div>
            );
          } else {
            return (
              <div>
                <a href="#" onClick={this.props.actions.showQuizOptions}>Options</a>

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
