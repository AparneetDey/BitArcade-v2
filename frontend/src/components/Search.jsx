import React  from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {

	return (
		<div className='search'>
			<div className='bar'>
				<img src="/search-icon.svg" alt="Search Icon" />
				<input
					type="search"
					placeholder='Search for your favourite game'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				{searchTerm === '' ? <div className='absolute text-white right-1'>Genres</div> : ''}
			</div>
		</div>
	)
}

export default Search