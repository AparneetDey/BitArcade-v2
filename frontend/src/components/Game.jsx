import React from 'react'

const Game = ({game: {name, background_image, released, rating, parent_platforms}}) => {

	return (
		<div className='game'>
			<div className='poster'>
				<img src={background_image? background_image : './no-poster.png'} alt="Movie Poster" />
			</div>
			<div className='details'>
				<p className='title'>
					{name}
				</p>
				<div className='info'>
					{released ? released.split('-')[0] : 'N/A'}
					<span>|</span>
					<img className='w-[12px] h-[12px] md:w-[15px] md:h-[15px]' src="./Star.png" alt="Star icon" />
					{rating > 0 ? rating : 'N/A'}
					<span>|</span>
					{parent_platforms ? `${parent_platforms[0].platform.name}` : 'N/A'}
				</div>
			</div>
		</div>
	)
}

export default Game