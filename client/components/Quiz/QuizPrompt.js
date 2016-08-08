import React, {Component} from 'react';

export default class QuizPrompt extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {word, options} = this.props;

    return (
      <div>
        {word[options.fromLang]}
      </div>
    );
  }
}
