import React from 'react'
import Search from './Search'
import Button from './Button'
import { NavLink } from 'react-router'
import { useScreenSize } from './useScreenSize'

const Navbar = ({searchTerm, setSearchTerm, userData}) => {
	const { width, height } = useScreenSize();

	return (
		<nav className=''>
			<NavLink to={'/'} onClick={() => window.location.reload()} className={'cursor-pointer'}><h1><span className='text-[#FF8811]'>Bit</span><span className='text-[#579ED5]'>Arcade</span></h1></NavLink>
			{width <= 480 ? '' 
			:<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			}
			{userData.username ? 
			(<NavLink to={'/profile'} className={'profile-icon'}>
				<img src="/profile-icon.png" alt="Profile Icon" />
			</NavLink>)
			: 
			<NavLink to={'/authentication/login'}>
				<Button content={"Join Now"} />
			</NavLink>
			}
		</nav>
	)
}

export default Navbar