import React, { Component } from 'react'

export class StatsArea extends Component {

  state = {
    cheat: false
  }

  showCheat() {
    if (this.state.cheat) {
      return 'Order: ' + this.props.sequence; 
        
    } else {
      return <button onClick={this.updateCheat} className='CheatButton'>Cheat</button>;
    }
  }

  updateCheat = () => {
    this.setState({ cheat: true});
  }


  render() {
    return (
      <div style={{padding: '10px'}}>
        <div className='Stats'>
          Score: {this.props.score}
        </div>

        <div className='Stats'>
          High Score: {this.props.highScore}
        </div>

        <div>         
          {this.showCheat()}
        </div>
                    
        
      </div>
    )
  }
}

export default StatsArea
