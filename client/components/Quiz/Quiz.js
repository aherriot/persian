import React, {Component} from 'react';

export default class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  componentDidMount() {
    if (this.props.words.hasLoaded) {
      this.props.actions.selectWord();
    } else {
      this.props.actions.fetchWords();
    }
  }

  onCorrect = () => {
    this.props.actions.markCorrect(this.props.currentWord);
  }

  onWrong = () => {
    this.props.actions.markWrong(this.props.currentWord);
  }

  render() {
    return (
      <div>
        {() => {
          if(this.props.currentWord) {
            return <p>{this.props.currentWord.english} {this.props.currentWord.scores}</p>;
          }
        }()}
        <input type="text" ref="response"/>
        <button onClick={this.onCorrect}>Mark Correct</button>
        <button onClick={this.onWrong}>Mark Wrong</button>

      </div>
    );
  }
}
Quiz.propTypes = {
  // quiz: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};
