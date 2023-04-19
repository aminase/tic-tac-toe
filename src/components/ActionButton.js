import React from 'react'

const ActionButton = ({ onClick, value }) => {
  return (
    <div>
      <button type='button' className='restart-game-button' onClick={onClick}>
        {value}{' '}
      </button>
    </div>
  )
}

export default ActionButton
