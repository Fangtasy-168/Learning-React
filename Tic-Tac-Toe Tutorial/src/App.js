import React from "react"
import { useState } from "react"


// Component that creates a square allowing us to reuse as many times as needed in our code below
function Square() {
  const [value, setValue] = useState(null)
  // value stores the value and setValue is a function that can be used to change the value.
  // null is passed to useState to set inital value for the state variable. value starts off equal to null.

  function handleClick() {
    setValue('X')
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  )
}

export default function Board() {
  return (
    <>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
    </>
  )
}
