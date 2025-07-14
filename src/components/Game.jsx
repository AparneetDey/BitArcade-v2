import React from 'react'

const Game = ({game}) => {
	console.log(game);

	return (
		<div className='game'>
			<div className='poster'>
				<img src="./no-poster.png" alt="Movie Poster" />
			</div>
			<div className='absolute bottom-0 left-4 text-white'>
				<p>{game}</p>
				<p>Game Info</p>
			</div>
		</div>
	)
}

export default Game