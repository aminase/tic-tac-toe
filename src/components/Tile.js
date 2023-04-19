import React from 'react'
import './Tile.css'

const Tile = ({ tile, index, updateGameBoard }) => {
  return (
    <button className='tile' onClick={() => updateGameBoard(index)}>
      <h1>{tile}</h1>
    </button>
  )
}

export default Tile
