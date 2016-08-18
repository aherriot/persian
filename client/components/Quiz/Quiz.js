import React, {Component} from 'react';

import quizStates from '../../constants/quizStates';

import QuizPrompt from './QuizPrompt';
import SelfEvaluationResponse from './SelfEvaluationResponse';
import QuizCorrect from './QuizCorrect';
import QuizWrong from './QuizWrong';
import QuizOptions from './QuizOptions';
import WordEditForm from '../Words/WordEditForm';

import * as styles from './Quiz.css';

class Quiz extends Component {
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

  showQuizOptions = (event) => {
    event.preventDefault();
    this.props.actions.showQuizOptions();
  }

  startEditingWord = (event) => {
    event.preventDefault();
    this.props.actions.startEditingWord();
  }

  getContent = () => {

    const {
      quizState,
      currentWord,
      response,
      options,
      isEditingWord
    } = this.props.quiz;

    const {
      setQuizOptions,
      editWord,
      quizEditWord,
      revertEditWord,
      showQuizOptions,
      revertQuizOptions,
      selectWord,
      selfEvaluate,
      checkWord,
      markCorrect,
      markWrong,
      undoMarkWrong
    } = this.props.actions;


    switch (quizState) {

      case quizStates.QUIZZING:

        if(currentWord) {
          return (
            <QuizPrompt
              word={currentWord}
              options={options}
              checkWord={checkWord}
              selfEvaluate={selfEvaluate}
            />
          )
        } else {
          return (<div>No words match filter: {options.filter}</div>)
        }

      case quizStates.SELF_EVAL:

        return (
          <SelfEvaluationResponse
            word={currentWord}
            options={options}
            markCorrect={markCorrect}
            markWrong={markWrong}
          />
        )


      case quizStates.CORRECT:
        return (
          <div>
            <p>{currentWord[options.fromLang]}</p>

            <QuizCorrect
              selectWord={selectWord}
              response={response}
              word={currentWord}
              fromLang={options.fromLang}
              toLang={options.toLang}
            />
          </div>
        )

      case quizStates.WRONG:
        return (
          <div>
            <p>{currentWord[options.fromLang]}</p>
            <QuizWrong
              selectWord={selectWord}
              undoMarkWrong={undoMarkWrong}
              response={response}
              word={currentWord}
              fromLang={options.fromLang}
              toLang={options.toLang}
              typeResponse={options.typeResponse}
            />
          </div>
        )

      case quizStates.EDITING:
        return (
          <WordEditForm
            isNew={false}
            word={currentWord}
            revert={revertEditWord}
            quizEditWord={quizEditWord}
            horizontalLayout={false}
          />
        )

      case quizStates.OPTIONS:
        return (
          <QuizOptions
            options={options}
            setQuizOptions={setQuizOptions}
            revertQuizOptions={revertQuizOptions}
          />
        )

      default:

        return (
          <div>
            <p>No words match filter: {options.filter}</p>
          </div>
        )

    }
  }

  render() {
    const {
      showQuizOptions,
      startEditingWord
    } = this.props.actions;

    return (
      <div className={styles.quiz}>
        <div className={styles.quizHeader}>
          <div><a href="#" onClick={this.showQuizOptions}>Options</a></div>
          <div><a href="#" onClick={this.startEditingWord}>Edit Word</a></div>
        </div>
        <div className={styles.quizBody}>
          {this.getContent()}
        </div>
      </div>
    );
  }
}


Quiz.propTypes = {
  // quiz: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};

export default Quiz
