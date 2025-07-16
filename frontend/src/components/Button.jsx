import React from 'react'

const Button = ({ content}) => {
	return (
		<div>
			<div className='button'>
				{content}
			</div>
		</div>
	)
}

export default Button