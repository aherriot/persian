import React, {Component} from 'react';
import classnames from 'classnames';

import quizStates from '../../constants/quizStates';
import * as constants from '../../constants/constants';

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
    if(this.props.words.status === constants.INIT || this.props.words.status === constants.ERROR) {
      this.props.actions.fetchWords();
    }

    if(this.props.scores.status === constants.INIT || this.props.scores.status === constants.ERROR) {
      this.props.actions.fetchScores();
    }


    if(this.props.words.status === constants.SUCCESS) {
      this.props.actions.selectWord();
    }
  }

  componentWillReceiveProps(newProps) {
    if(!this.props.quiz.currentWord) {
      if(this.props.words.status !== constants.SUCCESS && newProps.words.status === constants.SUCCESS) {
        this.props.actions.selectWord();
      }
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
      currentWordId,
      response,
      currentBucket,
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

    const currentWord = this.props.words.byId[currentWordId];

    switch (quizState) {

      case quizStates.QUIZZING:

        if(currentWordId) {
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
            currentBucket={currentBucket}
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
      quizState,
      options
    } = this.props.quiz;

    const {
      showQuizOptions,
      startEditingWord
    } = this.props.actions;


    return (
      <div className={styles.quiz}>
        <div className={styles.quizHeader}>
          <div className={styles.titleSection}>
            Quiz: {options.filter ? options.filter : 'All'}
          </div>
          <div className={styles.actionSection}>
            <a
              className={classnames(
                [styles.actionLink],
                {[styles.activeActionLink]: quizState === quizStates.OPTIONS}
              )}
              href="#" onClick={this.showQuizOptions}>
              Options
            </a>

            <a
              className={classnames(
                [styles.actionLink],
                {[styles.activeActionLink]: quizState === quizStates.EDITING}
              )}
              href="#" onClick={this.startEditingWord}>
              Edit Word
            </a>
          </div>
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
