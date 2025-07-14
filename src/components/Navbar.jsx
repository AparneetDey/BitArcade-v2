import React from 'react'
import Search from './Search'
import Button from './Button'

const Navbar = ({searchTerm, setsearchTerm}) => {
	return (
		<nav className=''>
			<h1><span className='text-[#FF8811]'>Bit</span><span className='text-[#579ED5]'>Arcade</span></h1>
			<Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
			<div>
				<Button content={"Join Now"} display={'hidden'} />
			</div>
		</nav>
	)
}

export default Navbar