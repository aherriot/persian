import React, {Component} from 'react';

export default class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    if (this.props.words.list.length === 0) {
      this.props.actions.fetchWords();
    }

  }

  render() {
    return (
      <div>

        <button onClick={this.props.actions.selectWord}>selectWord</button>
        {this.props.words.quiz.currentWord}
        {this.props.words.list.map(word => <p key={word.id}>{word.english}</p>)}
      </div>
    );
  }
}
Quiz.propTypes = {
  // quiz: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};
