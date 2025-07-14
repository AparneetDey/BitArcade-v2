import React from 'react'

const Game = ({game: {title, thumb, releaseDate, dealRating, normalPrice}}) => {
	const year = new Date(releaseDate * 1000).getFullYear();

	return (
		<div className='game'>
			<div className='poster'>
				<img src={thumb? thumb : './no-poster.png'} alt="Movie Poster" />
			</div>
			<div className='details'>
				<p className='title'>
					{title}
				</p>
				<div className='info'>
					{year? year : 'N/A'}
					<span>|</span>
					<img className='w-[12px] h-[12px] md:w-[15px] md:h-[15px]' src="./Star.png" alt="Star icon" />
					{dealRating}
					<span>|</span>
					{`$${normalPrice}`}
				</div>
			</div>
		</div>
	)
}

export default Game