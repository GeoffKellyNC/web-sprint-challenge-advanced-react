import React, { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
let initialIndex = 4 // the index the "B" is at


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [currentPosition, setCurrentPosition] = useState(4)
  const [ coordinates, setCoordinates ] = useState([2,2])
  const [email, setEmail] = useState(initialEmail)
  const [currentSteps, setCurrentSteps] = useState(initialSteps)
  const [ message, setMessage ] = useState(initialMessage)
  

 

const setCord = (index) => {
  if (index === 0) {
    setCoordinates([0,0])
  }
  if (index === 1) {
    setCoordinates([0,1])
  }
  if (index === 2) {
    setCoordinates([0,2])
  }
  if (index === 3) {
    setCoordinates([1,0])
  }
  if (index === 4) {
    setCoordinates([1,1])
  }
  if (index === 5) {
    setCoordinates([1,2])
  }
  if (index === 6) {
    setCoordinates([2,0])
  }
  if (index === 7) {
    setCoordinates([2,1])
  }
  if (index === 8) {
    setCoordinates([2,2])
  }

}

  console.log('currentPosition', currentPosition)

  function move(evt) {
    const direction = evt.target.id
    if (currentPosition < 0 || currentPosition > 8) {
      return
    }
    if(direction === 'up' && currentPosition > 1) {
      setCurrentPosition(currentPosition - 3)
      setCord(currentPosition)
      setCurrentSteps(currentSteps + 1)

    }
    if(direction === 'down' && currentPosition < 7) {
      setCurrentPosition(currentPosition + 3)
      setCord(currentPosition)
      setCurrentSteps(currentSteps + 1)
    }
    if(direction === 'left' && currentPosition > 0) {
      console.log('left')
      setCurrentPosition(currentPosition - 1)
      setCord(currentPosition)
      setCurrentSteps(currentSteps + 1)
    }
    if(direction === 'right' && currentPosition < 8) {
      console.log('right')
      setCurrentPosition(currentPosition + 1)
      setCord(currentPosition)
      setCurrentSteps(currentSteps + 1)
    }
    if (direction === 'reset'){
      setCurrentPosition(initialIndex)
      setCord(initialIndex)
      setCurrentSteps(initialSteps)
    }
    
  }

  function onChange(evt) {
    setEmail(evt.target.value)
    
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (email.length < 1) {
      setMessage('Ouch: email must be a valid email.')
      return
    } else {
      const res = await axios.post('http://localhost:9000/api/result', { x: coordinates[0], y: coordinates[1], steps: currentSteps  ,email: email })

      console.log('X:', coordinates[0], 'Y:', coordinates[1], 'Steps:', currentSteps, 'Email:', email) //! REMOVE THIS

      console.log('RES DATA:',res.data) //! REMOVE THIS


      if(res.status === 200) {
        console.log('Success: ', res.data)
        setMessage(res.data.message)
        setCurrentPosition(initialIndex)
        setCord(initialIndex)
        setCurrentSteps(initialSteps)
        setEmail(initialEmail)
        return
      } else {
        setMessage('Enter Valid Email')
        return
      }
  }

  

  }

  const reset = () => {
    setCurrentPosition(initialIndex)
    setCord(initialIndex)
    setCurrentSteps(initialSteps)
  }



  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates { `(${coordinates})` }</h3>
        <h3 id="steps">You moved { currentSteps } times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === currentPosition ? ' active' : ''}`}>
              {idx === currentPosition ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{ message }</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick = { move }>LEFT</button>
        <button id="up" onClick={ move }>UP</button>
        <button id="right" onClick = { move }>RIGHT</button>
        <button id="down" onClick = { move }>DOWN</button>
        <button id="reset" onClick = { reset }>reset</button>
      </div>
      <form onSubmit = { onSubmit }>
        <input 
          id="email" 
          type="text"
          value={ email }
          onChange={onChange}
          />
        <input 
          id="submit" 
          type="submit"
          />
      </form>
    </div>
  )
}
