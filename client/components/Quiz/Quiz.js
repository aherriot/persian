import React, {Component} from 'react';

import QuizPrompt from './QuizPrompt';
import QuizResponse from './QuizResponse';
import QuizResults from './QuizResults';
import QuizOptions from './QuizOptions';
import WordEditForm from '../Words/WordEditForm';

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

  startEditingWord = (event) => {
    event.preventDefault();
    this.props.actions.startEditingWord();
  }

  render() {

    const {
      currentWord,
      isQuizzing,
      isCorrect,
      response,
      options,
      showingOptions,
      isEditingWord
    } = this.props.quiz;

    const {
      updateQuizOptions,
      startEditingWord,
      editWord,
      quizEditWord,
      revertEditWord,
      showQuizOptions,
      selectWord,
      undoMarkWrong
    } = this.props.actions;

    return (
      <div>
        <a href="#" onClick={this.showQuizOptions}>Options</a><br />
        <a href="#" onClick={this.startEditingWord}>Edit Word</a>


        {() => {
          if(showingOptions) {
            return (
              <QuizOptions
                options={options}
                updateQuizOptions={updateQuizOptions}
              />
            );

          } else if(currentWord) {

            if(isEditingWord) {
              return (
                <WordEditForm
                  isNew={false}
                  word={currentWord}
                  revert={revertEditWord}
                  quizEditWord={quizEditWord}/>
              )

            } else if(isQuizzing) {
              return (
                <div>
                  <QuizPrompt word={currentWord} options={options}/>
                  <QuizResponse onSubmitResponse={this.onSubmitResponse} />
                </div>
              );
            } else if(response !== null && response !== undefined) {
              return (
                <div>
                  <p>{currentWord[options.fromLang]}</p>

                  <QuizResults
                    selectWord={selectWord}
                    undoMarkWrong={undoMarkWrong}
                    isCorrect={isCorrect}
                    response={response}
                    word={currentWord}
                    fromLang={options.fromLang}
                    toLang={options.toLang}
                  />
                </div>
              );
            }
          } else if(!currentWord){
            return (
              <div>
                <p>No words match filter: {options.filter}</p>
              </div>
            );
          }
        }()}

      </div>
    );
  }
}
Quiz.propTypes = {
  // quiz: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};
