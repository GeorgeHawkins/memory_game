import React, { Component } from 'react';
import './App.css';
import GameArea from './Components/GameArea';
import StatsArea from './Components/StatsArea';

class App extends Component {
  state = {
    sequence: [],
    score: 0,
    highScore: 0
  }

  addToOrder = () => {
    let random = Math.floor(Math.random() * (9) ) + 1;
    while (random === this.state.sequence[this.state.sequence.length-1]) {
      random = Math.floor(Math.random() * (9) ) + 1
    }
    const list = this.state.sequence.concat(random);
    this.setState({ sequence: list })
  }

  incrementScore = () => {
    if (this.state.highScore < this.state.score + 1) {
      this.setState({ highScore: this.state.score + 1 });
    }
    this.setState({ score: this.state.score + 1 });
    
  }

  newGame = () => {
    this.setState({ score: 0, sequence: [] });
  }

  render() {
    return (
      <div className="App">
        <div className='Main'>
          <h1>JS Memory Game</h1>
          <StatsArea sequence={this.state.sequence} score={this.state.score} highScore={this.state.highScore} />
          <GameArea addToOrder={this.addToOrder} sequence={this.state.sequence} incrementScore={this.incrementScore} newGame={this.newGame} />
        </div>

      </div>
    );
  }
  
}

export default App;
