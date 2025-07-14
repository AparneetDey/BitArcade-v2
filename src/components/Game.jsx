import React from 'react'

const Game = ({game}) => {

	return (
		<div className='game'>
			<div className='poster'>
				<img src="./no-poster.png" alt="Movie Poster" />
			</div>
			<div className='absolute bottom-2 left-4 text-white'>
				<p className='truncate w-[300px]'>{game.title}</p>
				<p>Game Info</p>
			</div>
		</div>
	)
}

export default Game