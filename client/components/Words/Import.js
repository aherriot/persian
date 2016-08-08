import React, {Component} from 'react';


class Import extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };
  }

  onImport = (e) => {
    e.preventDefault();
    const text = this.refs.textArea.value;
    let words = [];

    if(text.length === 0) {
      this.setState({error: 'You must enter data to import.'});
      return false;
    }

    if(text.indexOf('|') >= -1) {
      words = text.split('\n').map(word => {
        word = word.split('|');
        let tags = word[3].split(',').map(tag => tag.trim());
        return {
          english: word[0],
          persian: word[1],
          phonetic: word[2],
          tags: tags
        };
      });

    } else {
      words = JSON.parse(this.refs.textArea.value);
    }

    this.props.actions.bulkAddWords(words);
    return false;
  }

  render() {
    const {error} = this.state;

    return (
      <div>
      <h1>Import</h1>
      <div>
        {error && error}
      </div>
      <form onSubmit={this.onImport}>
        <textarea ref="textArea" cols="100" rows="15" /><br />
        <button>Import</button>
      </form>

      </div>
    );
  }
}

export default Import;
