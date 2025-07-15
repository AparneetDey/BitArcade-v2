import React from 'react'
import Search from './Search'
import Button from './Button'
import { NavLink } from 'react-router'

const Navbar = ({searchTerm, setsearchTerm}) => {
	return (
		<nav className=''>
			<h1><span className='text-[#FF8811]'>Bit</span><span className='text-[#579ED5]'>Arcade</span></h1>
			<Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
			<NavLink to={'/authentication/signup'}>
				<Button content={"Join Now"} display={'hidden'} />
			</NavLink>
		</nav>
	)
}

export default Navbar