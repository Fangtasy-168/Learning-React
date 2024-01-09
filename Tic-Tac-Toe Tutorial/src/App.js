import React from "react"
import { useState } from "react"

// Component that creates a square allowing us to reuse as many times as needed in our code below
function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}>
      {value}
    </button>
  )
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null)) // initialize squares to equal and array of 9 nulls
  const [xIsNext, setXIsNext] = useState(true) // initialized xIsNext as true

  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice() // created a copy to modify to keep immuntability because when a parents state changes all children update
    nextSquares[i] = 'X'

    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O'

    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }


  /* passing the squares state as a prop down to the component so it knows what to render. Also passing the function handleClick as a props */
  return (
    <>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />

      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}
