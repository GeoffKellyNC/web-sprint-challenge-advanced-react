import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at



export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor(props) {
    super(props)
    this.state = {
      currentPosition: initialIndex,
      coordinates: [2,2],
      email: initialEmail,
      currentSteps: initialSteps
    }
  }

  setCord = (index) => {
    if (index === 0) {
      this.setState({
        coordinates: [0,0]
      })
    }
    if (index === 1) {
      this.setState({
        coordinates: [0,1]
      })
    }
    if (index === 2) {
      this.setState({
        coordinates: [0,2]
      })
    }
    if (index === 3) {
      this.setState({
        coordinates: [1,0]
      })
    }
    if (index === 4) {
      this.setState({
        coordinates: [1,1]
      })
    }
    if (index === 5) {
      this.setState({
        coordinates: [1,2]
      })
    }
    if (index === 6) {
      this.setState({
        coordinates: [2,0]
      })
    }
    if (index === 7) {
      this.setState({
        coordinates: [2,1]
      })
    }
    if (index === 8) {
      this.setState({
        coordinates: [2,2]
      })
    }
  }




  move = (evt) => {
    const direction = evt.target.id
    if(direction === 'up' && this.state.currentPosition > 0) {
      this.setState({
        currentPosition: this.state.currentPosition - 3,
        currentSteps: this.state.currentSteps + 1
      })
      this.setCord(this.state.currentPosition)
    }
    if(direction === 'down' && this.state.currentPosition < 4) {
      this.setState({
        currentPosition: this.state.currentPosition + 3,
        currentSteps: this.state.currentSteps + 1
      })
      this.setCord(this.state.currentPosition)
    }
    if(direction === 'left' && this.state.currentPosition % 3 !== 0) {
      this.setState({
        currentPosition: this.state.currentPosition - 1,
        currentSteps: this.state.currentSteps + 1
      })
      this.setCord(this.state.currentPosition)
    }

    if(direction === 'right' && this.state.currentPosition % 3 !== 2) {
      this.setState({
        currentPosition: this.state.currentPosition + 1,
        currentSteps: this.state.currentSteps + 1
      })
      this.setCord(this.state.currentPosition)
    }

  }

  onChange = (evt) => {
    this.setState({
      email: evt.target.value
    })
  }

  onSubmit = async (evt) => {
    evt.preventDefault()
    const res = await axios.post('http://localhost:9000/api/result', {
      x: this.state.coordinates[0],
      y: this.state.coordinates[1],
      steps: this.state.currentSteps,
      email: this.state.email
    })
    
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={this.props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates { `(${this.state.coordinates[0], this.state.coordinates[1]})` }</h3>
        <h3 id="steps">You moved { this.state.currentSteps } times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === this.state.currentPosition ? ' active' : ''}`}>
              {idx === this.state.currentPosition ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left" onClick = { this.move }>LEFT</button>
        <button id="up" onClick={ this.move }>UP</button>
        <button id="right" onClick = { this.move }>RIGHT</button>
        <button id="down" onClick = { this.move }>DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input 
          id="email" 
          type="text"
          value={ this.state.email }
          onChange={ this.onChange }
          />
        <input 
          id="submit" 
          type="submit"
          onSubmit={ this.onSubmit }
          />
      </form>
    </div>
    )
  }
}
