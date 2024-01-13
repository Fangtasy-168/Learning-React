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

function Board({ xIsNext, squares, onPlay }) { // added the properties the function can accept

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) { // checks if square clicked already has a value or if there is already a winner
      return;
    }
    const nextSquares = squares.slice() // created a copy to modify to keep immuntability to keep previous data of turns intact for later usuage
    nextSquares[i] = 'X'

    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O'

    onPlay(nextSquares)
  }
  // Function to declare current turn of the game or winner if game ended
  const winner = calculateWinner(squares) // refer to the function to see the value it returns (should be "X" or "O")
  let status
  if (winner) {
    status = "Winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  const boardSize = 3
  function renderSquares() {
    let layout = []
    // Outer loop to define the rows
    for (let row = 0; row < boardSize; row++) {
      const rows = []
      // Inner loop to define the squares in the row
      for (let col = 0; col < boardSize; col++) {
        let squareIndex = row * boardSize + col
        rows.push(<Square key={squareIndex + "-square"} value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} />)
      }
      layout.push(
        <div key={row + "-row"} className='board-row'>
          {rows}
        </div>
      )
    }
    return layout
  }
  return (
    <>
      <div className='status'>{status}</div>
      <div>{renderSquares()}</div>
    </>
  )
}
function Info({ history, onJump, ascend, sort }) {

  let turn = history.length
  const moves = history.map((squares, move) => {
    let description
    let syntax
    if (move > 0) {
      description = 'Go to move #' + move
      syntax = <button onClick={() => onJump(move)}>{description}</button>
    }
    else {
      description = 'Go to game start'
      syntax = <button onClick={() => onJump(move)}>{description}</button>
    }
    return (
      <li key={move}>
        {syntax}
      </li>
    )
  })
  let sorted = ascend ? moves : moves.reverse()

  return (
    <>
      <p>{'You are at move #' + turn}</p>
      <button onClick={sort}>Sorting</button>
      <ol>{sorted}</ol>
    </>
  )
}
export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]) // Operates similar to our previous initalization of squares with an array of 9 filled with nulls but with this its an array of 9 nested in an array
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove] // current or currently selected move will be displayed
  const [ascending, setAscending] = useState(true)


  function handleplay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares] // copies the history up to a current point in case a person makes a new move after backtracking
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  function sorting() {
    setAscending(!ascending)
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handleplay} />
      </div>
      <div className="game-info">
        <Info history={history} onJump={jumpTo} ascend={ascending} sort={sorting} />
      </div>
    </div>
  )
}

//Function that determines if there is winner by checking for 3 consecutive inputs of the same value (X or O)
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Three in top row
    [3, 4, 5], // Three in middle row
    [6, 7, 8], // Three in bottom row
    [0, 3, 6], // Three in left column
    [1, 4, 7], // Three in middle column
    [2, 5, 8], // Three in right column
    [0, 4, 8], // Three Diagonal from top left to bottom right
    [2, 4, 6], // Three Diagonal from top right to bottom left
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // Check if first box is a value, then checks if the following boxes indicated by the index is of the same value
      return squares[a]
    }

  }
  return null // made a mistake in the previous function
}

