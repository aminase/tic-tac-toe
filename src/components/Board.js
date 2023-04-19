import React, { useEffect, useState } from 'react'
import Tile from '../components/Tile'
import ActionButton from '../components/ActionButton'
import './Board.css'

const winningBlocks = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
]

const Board = () => {
  const [gameBoardData, setGameBoardData] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ])
  const [player, setPlayer] = useState('X')
  const [result, setResult] = useState({ winner: 'none', state: 'none' })
  const [winCountX, setWinCountX] = useState([])
  const [winCountO, setWinCountY] = useState([])

  const switchPlayer = () => (player === 'X' ? setPlayer('O') : setPlayer('X'))

  const checkForWinner = () => {
    for (let i = 0; i < winningBlocks.length; i++) {
      const [d, e, f] = winningBlocks[i]
      if (
        gameBoardData[d] &&
        gameBoardData[d] === gameBoardData[e] &&
        gameBoardData[d] === gameBoardData[f]
      ) {
        return [gameBoardData[d]]
      }
    }
    return null
  }

  const updateGameBoard = index => {
    const newGameBoardData = [...gameBoardData]
    if (newGameBoardData[index] === null) {
      newGameBoardData[index] = player
      setGameBoardData(newGameBoardData)
      switchPlayer()
    }
    if (checkForWinner(['X'])) {
      return winCountX.push('X')
    } else {
      return winCountO.push('O')
    }
  }

  console.log(winCountX, '---x')
  console.log(winCountO, '---o')

  const restartGame = () => {
    setGameBoardData([null, null, null, null, null, null, null, null, null])
  }

  return (
    <div className='container'>
      <div className='title'> Tic-Tac-Toe Board</div>
      <div className='game-board'>
        {gameBoardData.map((tile, index) => (
          <Tile
            key={index}
            index={index}
            tile={tile}
            player={player}
            updateGameBoard={updateGameBoard}
            gameBoardData={gameBoardData}
          />
        ))}
      </div>
      {checkForWinner() ? (
        <>
          <h1>Winner is: {checkForWinner()} </h1>
          <ActionButton onClick={restartGame} value='Restart Game' />
        </>
      ) : (
        <ActionButton onClick={restartGame} value='Try Again' />
      )}
    </div>
  )
}

export default Board
