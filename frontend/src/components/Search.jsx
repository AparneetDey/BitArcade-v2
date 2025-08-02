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
				{searchTerm === '' ? <NavLink to={'/genres'} className='absolute text-white right-1 px-2 py-0.5 bg-[#579ED5] border-[#366183] border-2 rounded-full text-[14px] font-[500] hover:bg-[#3e7299] '>Genres</NavLink> : ''}
			</div>
		</div>
	)
}

export default Search