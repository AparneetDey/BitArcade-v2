import React from 'react'
import Search from './Search'
import Button from './Button'
import { NavLink } from 'react-router'
import { useScreenSize } from './useScreenSize'

const Navbar = ({searchTerm, setSearchTerm}) => {
	const { width, height } = useScreenSize();

	return (
		<nav className=''>
			<h1><span className='text-[#FF8811]'>Bit</span><span className='text-[#579ED5]'>Arcade</span></h1>
			{width <= 480 ? '' 
			: <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			}
			<NavLink to={'/authentication/signup'}>
				<Button content={"Join Now"} />
			</NavLink>
		</nav>
	)
}

export default Navbar