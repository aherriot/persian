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

    const {
      currentWord,
      isQuizzing,
      isCorrect,
      response,
      options,
      showingOptions
    } = this.props.quiz;

    const {
      updateQuizOptions,
      showQuizOptions,
      selectWord,
      undoMarkWrong
    } = this.props.actions;

    return (
      <div>
        {() => {
          if(showingOptions) {
            return (
              <QuizOptions
                options={options}
                updateQuizOptions={updateQuizOptions}
              />
            );

          } else if(currentWord && isQuizzing) {
            return (
              <div>
                <a href="#" onClick={this.showQuizOptions}>Options</a>
                <div>
                  Bucket: {currentWord.scores}
                  <br/>
                  Filter: {options.filter}

                </div>
                {currentWord[options.fromLang]}

                <QuizResponse onSubmitResponse={this.onSubmitResponse} />
              </div>
            );
          } else if(currentWord && response) {
            return (
              <div>
                <a href="#" onClick={showQuizOptions}>Options</a>
                <p>{currentWord[options.fromLang]}</p>

                <QuizResults
                  selectWord={selectWord}
                  undoMarkWrong={undoMarkWrong}
                  isCorrect={isCorrect}
                  response={response}
                  correctAnswer={currentWord[options.toLang]}
                />
              </div>
            );
          } else if(isQuizzing && !currentWord){
            return (
              <div>
                <a href="#" onClick={showQuizOptions}>Options</a>
                <br/>
                <p>No words match filter.</p>
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
