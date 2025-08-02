import React  from 'react'
import { NavLink } from 'react-router'

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
				{searchTerm === '' ? <NavLink to={'/genres'} className='genre-btn'>Genres</NavLink> : ''}
			</div>
		</div>
	)
}

export default Search