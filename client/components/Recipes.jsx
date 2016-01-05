import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: ['pizza dough', 'spaghetti', 'ceasar salad'],
      counter: 0,
      show: true
    };
  }

  onClick = (e) => {
    e.preventDefault();

    this.setState({
      show: !this.state.show
    });
  }

  onAdd = (e) => {
    e.preventDefault();
    const recipes = this.state.recipes.slice();
    recipes.push('recipe ' + this.state.counter);

    this.setState({
      recipes: recipes,
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div>
        <h2>Recipes</h2>
        <Link to="/users">Users</Link><br />

        <button type="button" onClick={this.onAdd}>Add</button>

        <ul>
          {this.state.recipes.map((recipe) => {
            return (<li key={recipe}>{recipe}</li>);
          })}
        </ul>

        <button type="button" onClick={this.onClick}>{this.state.show ? 'hide' : 'show'}</button>

        {(() => {
          if (this.state.show) {
            return <p>showing toggled content</p>;
          }
        })()}
      </div>
    );
  }
}
