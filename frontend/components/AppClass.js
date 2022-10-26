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
      currentSteps: initialSteps,
      message: initialMessage
    }
  }


  move = (evt) => {
    const direction = evt.target.id

    if (direction === 'up'){
      this.setState({
        message: initialMessage
      })

      if (this.state.currentPosition > 2){
        this.setState({
          currentPosition: this.state.currentPosition - 3,
          currentSteps: this.state.currentSteps + 1,
          coordinates: [this.state.coordinates[0], this.state.coordinates[1] - 1]
        })
        return
      }
      this.setState({
        message: " You can't go up"
      })
    }

    if (direction === 'down'){
      if (this.state.currentPosition < 6){
        this.setState({
          currentPosition: this.state.currentPosition + 3,
          currentSteps: this.state.currentSteps + 1,
          coordinates: [this.state.coordinates[0], this.state.coordinates[1] + 1]
        })
        return
      }
      this.setState({
        message: " You can't go down"
      })
    }

    if (direction === 'left'){
      if (this.state.currentPosition % 3 !== 0){
        this.setState({
          currentPosition: this.state.currentPosition - 1,
          currentSteps: this.state.currentSteps + 1,
          coordinates: [this.state.coordinates[0] - 1, this.state.coordinates[1]]
        })
        return
      }
      this.setState({
        message: " You can't go left"
      })
    }

    if (direction === 'right'){
      if (this.state.currentPosition % 3 !== 2){
        this.setState({
          currentPosition: this.state.currentPosition + 1,
          currentSteps: this.state.currentSteps + 1,
          coordinates: [this.state.coordinates[0] + 1, this.state.coordinates[1]]
        })
        return
      }
      this.setState({
        message: " You can't go right"
      })
    }

  }

  onChange = (evt) => {
    this.setState({
      email: evt.target.value
    })
  }

  onSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const res = await axios.post('http://localhost:9000/api/result', {
        x: this.state.coordinates[0],
        y: this.state.coordinates[1],
        steps: this.state.currentSteps,
        email: this.state.email
      })
      this.setState({
        message: res.data.message,
        email: '',
        currentSteps: 0,
        currentPosition: initialIndex,
        coordinates: [2,2]
      })
    } catch (err) {
      this.setState({
        message: err.response.data.message,
        email: '',
        currentSteps: 0,
        currentPosition: initialIndex,
        coordinates: [2,2]
      })
    }
  }
    


  reset = () => {
    this.setState({
      currentPosition: initialIndex,
      coordinates: [2,2],
      email: initialEmail,
      currentSteps: initialSteps,
      message: initialMessage
    })
  }

  render() {
    return (
      <div id="wrapper" className={this.props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates { `(${this.state.coordinates})` }</h3>
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
        <h3 id="message">{this.state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick = { this.move }>LEFT</button>
        <button id="up" onClick={ this.move }>UP</button>
        <button id="right" onClick = { this.move }>RIGHT</button>
        <button id="down" onClick = { this.move }>DOWN</button>
        <button id="reset" onClick = { this.reset }>reset</button>
      </div>
      <form onSubmit = { this.onSubmit }>
        <input 
          id="email" 
          type="text"
          value={ this.state.email }
          onChange={ this.onChange }
          />
        <input 
          id="submit" 
          type="submit"
          />
      </form>
    </div>
    )
  }
}

