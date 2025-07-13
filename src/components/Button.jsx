import React from 'react'

const Button = ({ content, display }) => {
	return (
		<div className={`${display} md:inline`}>
			<div className='button'>
				{content}
			</div>
		</div>
	)
}

export default Button