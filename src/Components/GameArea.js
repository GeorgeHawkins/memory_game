import React, { Component } from 'react'

export class GameArea extends Component {

  state = {
    currentOrder: null,
    gameOver: true,
    inputSequence: [],
    takeInput: false,
    levelCorrect: false,
    levelFailed: false
  }

  flashSquare = (id) => {
    if (this.state.currentOrder === id) {
      return {backgroundColor: '#00809C'}
    }
    if (this.state.levelCorrect) {
      return {backgroundColor: '#76B947'}
    }
    if (this.state.levelFailed) {
      return {backgroundColor: '#F72C25'}
    }
  }

  addToSequence = (id) => {
    if (this.state.takeInput) {
      const list = this.state.inputSequence.concat(id);
      this.setState({ inputSequence: list });
    } else {
      return;
    }
    const input = this.state.inputSequence.concat(id);
    const expected = this.props.sequence.slice(0, input.length);

    //check the user input matches the sequence after each new button press
    if (JSON.stringify(input) !== JSON.stringify(expected)) {
      this.flashAllSquares('red');
      this.setState({ inputSequence: [], gameOver: true, takeInput: false })
      this.props.newGame();
      return;
    }

    if(input.length === this.props.sequence.length) {
      this.flashAllSquares('green');
      this.props.incrementScore();
      this.setState({ takeInput: false, inputSequence: [] });
      setTimeout( () => {
        this.newLevel();
      }, 2000)
      
    }

  }

  async flashAllSquares(colour) {
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    await sleep(200);

    if (colour === 'red') {
      this.setState({ levelFailed: true});
      await sleep(300);
      this.setState({ levelFailed: false});
      await sleep(200);
      this.setState({ levelFailed: true});
      await sleep(300);
    }

    if (colour === 'green') {
      this.setState({ levelCorrect: true});
      await sleep(300);
      this.setState({ levelCorrect: false});
      await sleep(200);
      this.setState({ levelCorrect: true});
      await sleep(300);
    }

    this.setState({ levelFailed: false, levelCorrect: false });

  }

  async playSequence() {

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    await sleep(500);

    for (let i = 0; i < this.props.sequence.length; i++) {
      this.setState({ currentOrder: this.props.sequence[i] });
      await sleep(1000);
    }

    this.setState({ currentOrder: null, takeInput: true });
    
  }

  newLevel = () => {
    this.props.addToOrder();
    this.playSequence();
  }

  play_game = () => {
    this.setState({ gameOver: false});

    this.newLevel();

  }

  render() {
    return (
        <div>
          <div>
            <div className='GameSquare' style={this.flashSquare(1)} onClick={() => this.addToSequence(1)}/>
            <div className='GameSquare' style={this.flashSquare(2)} onClick={() => this.addToSequence(2)}/>
            <div className='GameSquare' style={this.flashSquare(3)} onClick={() => this.addToSequence(3)}/>
          </div>
          <div>
            <div className='GameSquare' style={this.flashSquare(4)} onClick={() => this.addToSequence(4)}/>
            <div className='GameSquare' style={this.flashSquare(5)} onClick={() => this.addToSequence(5)}/>
            <div className='GameSquare' style={this.flashSquare(6)} onClick={() => this.addToSequence(6)}/>
          </div>
          <div>
            <div className='GameSquare' style={this.flashSquare(7)} onClick={() => this.addToSequence(7)}/>
            <div className='GameSquare' style={this.flashSquare(8)} onClick={() => this.addToSequence(8)}/>
            <div className='GameSquare' style={this.flashSquare(9)} onClick={() => this.addToSequence(9)}/>
          </div>
          <div className='StartRow'>
            <button className='StartButton' disabled={!this.state.gameOver} onClick={this.play_game}>Start Game</button>
          </div>
          
          </div>
    )
  }
}

export default GameArea
