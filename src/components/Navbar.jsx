import React, {useState} from 'react'
import Search from './Search'
import Button from './Button'

const Navbar = ({searchTerm, setsearchTerm}) => {
	return (
		<nav className=''>
			<h1>BitArcade</h1>
			<Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
			<div>
				<Button content={"Join Now"} display={'hidden'} />
			</div>
		</nav>
	)
}

export default Navbar