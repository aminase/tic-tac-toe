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

const PLAYER_X = 'X'
const PLAYER_O = 'O'

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
  const [player, setPlayer] = useState(PLAYER_X)
  const [winnersArray, setWinnersArray] = useState([])
  const [winner, setWinner] = useState(null)

  const switchPlayer = () => {
    setPlayer(prevPlayer => (prevPlayer === PLAYER_X ? PLAYER_O : PLAYER_X))
  }

  const getWinner = () => {
    let currentWinner = null
    winningBlocks.forEach(block => {
      const [d, e, f] = block
      if (
        gameBoardData[d] &&
        gameBoardData[d] === gameBoardData[e] &&
        gameBoardData[d] === gameBoardData[f]
      ) {
        currentWinner = gameBoardData[d]
      }
    })
    return currentWinner
  }

  const updateGameBoard = index => {
    const newGameBoardData = [...gameBoardData]
    if (newGameBoardData[index] === null) {
      newGameBoardData[index] = player
      setGameBoardData(newGameBoardData)
      switchPlayer()
    }
  }

  const restartGame = () => {
    setGameBoardData([null, null, null, null, null, null, null, null, null])
    setWinner(null)
  }

  useEffect(() => {
    const currentWinner = getWinner()
    if (currentWinner !== null) {
      if (currentWinner === PLAYER_X) {
        setWinnersArray([...winnersArray, PLAYER_X])
        setWinner(PLAYER_X)
      } else {
        setWinnersArray([...winnersArray, PLAYER_O])
        setWinner(PLAYER_O)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameBoardData])

  const countPlayerXWins = winnersArray.filter(i => i === PLAYER_X).length
  const countPlayerOWins = winnersArray.filter(i => i === PLAYER_O).length

  const isBoardDirty = gameBoardData.some(board => board === PLAYER_O || board === PLAYER_X)

  const arr = [2, 4, 6]

  const arrayForEach = arr.forEach((ar, i) => {
    arr[i] = ar + 3
  })

  const arrayOne = [
    [1, 2],
    [3, 4],
    [5, 6],
  ]

  const arrayMap = arr.map(ar => ar + 3).filter(i => i < 12)

  return (
    <div className='container'>
      <div className='title'> Tic-Tac-Toe Board</div>
      <div className='x-win-count'>
        Player X's win: <strong>{countPlayerXWins}</strong>{' '}
      </div>
      <div className='o-win-count'>
        Player O's win: <strong>{countPlayerOWins}</strong>
      </div>
      <div className='game-board'>
        {gameBoardData.map((tile, index) => (
          <Tile
            key={index}
            index={index}
            tile={tile}
            player={player}
            updateGameBoard={updateGameBoard}
          />
        ))}
      </div>
      {winner && <h1>Winner is: {winner} </h1>}
      {isBoardDirty && <ActionButton onClick={restartGame} value='Restart Game' />}
    </div>
  )
}

export default Board
