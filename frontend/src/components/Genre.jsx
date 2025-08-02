import React from 'react'

const Genre = ({ genre }) => {
  return (
    <div className='genre'>
      <div className='background'>
        <img src={genre.image_background} alt={genre.name} />
      </div>
      <h3 className='name'>{genre.name}</h3>
    </div>
  )
}

export default Genre