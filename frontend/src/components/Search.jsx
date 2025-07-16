import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
	return (
		<div className='search'>
			<div>
				<img src="./search-icon.svg" alt="Search Icon" />
				<input
					type="search"
					placeholder='Search for your favourite game'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
		</div>
	)
}

export default Search