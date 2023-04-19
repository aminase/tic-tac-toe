import React from 'react'
import './Tile.css'

const Tile = ({ tile, index, updateGameBoard, player }) => {
  const style = player === 'X' ? 'tile x' : 'tile o'
  return (
    <button className={style} onClick={() => updateGameBoard(index)}>
      <h1>{tile}</h1>
    </button>
  )
}

export default Tile
