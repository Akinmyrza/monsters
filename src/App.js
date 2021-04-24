import React, { Component } from 'react';
import './App.css';

import {CardList} from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  /// if we use this kind of function so we need to create new this.handleChane method inside the constructor to allow the this method
  /// and we need bind this method to handleCgange 
  handleChange(e) {
    this.setState({ searchField: e.target.value })
  };

  /// if we use arrow function so we don't need to create something else, because arrow function automatically allow to this method 
  /// this is an easiest way there is no any bind methods and so on  
  onSearchChange = event => {
    this.setState({ searchField: event.target.value })
  }

  render() {
    // const monsters = this.state.monsters; same as below one 
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          // handleChange={e => this.setState({ searchField: e.target.value })}
          onSearchChange={this.onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
 