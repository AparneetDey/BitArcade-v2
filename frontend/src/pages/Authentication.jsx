import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink, useParams } from 'react-router';

const Authentication = () => {
	const { mode } = useParams();
	const Navigate = useNavigate();


	const [action, setAction] = useState(mode === 'signup' ? false : true); /* false - Signup | true - Login */

	console.log(action)

	useEffect(() => {
		setAction(mode === 'signup' ? false : true);
	}, [mode, Navigate])

	const toggleAuth = (q) => {
		console.log(q)
		const newMode = q ? 'login' : 'signup';
		Navigate(`/authentication/${newMode}`);
	}

	const bgImage = action ? '/login-bg.png' : '/signup-bg.png'

	return (
		<div className='authentication'>
			<section>
				<img src={bgImage} alt={action ? 'Login BG' : 'Signup BG'} />
				<NavLink to={'/'}>
					<img className='w-[15px] h-[15x] object-cover absolute top-[10px] left-[10px] cursor-pointer' src="/cross.svg" alt="Cross Icon" />
				</NavLink>
				<div className={`heading ${action ? 'top-[35%]' : 'top-[25%]'}`}>
					<h2>{action ? "Welcome back, let's get you back in the game." : 'Join the arcade — explore, discover, and track your favorite games.'}</h2>
				</div>
				<div className='input-fields'>
					<div className='all-inputs'>
						{action ? '' :
							<div className='input'> {/* Username */}
								<p>Username</p>
								<input
									className='outline-none w-full border-[2px] border-[#000000]/75 rounded-full pl-3 '
									type="text"
								/>
							</div>
						}
						<div className='input'> {/* Email */}
							<p>Email</p>
							<input
								className='outline-none w-full border-[2px] border-[#000000]/75 rounded-full pl-3 '
								type="mail"
							/>
						</div>
						<div className='input'> {/* Password */}
							<p>Password</p>
							<input
								className='outline-none w-full border-[2px] border-[#000000]/75 rounded-full pl-3 '
								type="password"
							/>
						</div>
					</div>
				</div>
				<div className='mt-4 flex justify-center items-center '>
					<div className='btn'>
						{action ? 'Login' : 'Signup'}
					</div>
				</div>
				<p className='bottom'>Already a part of the Arcade? <span onClick={()=>toggleAuth(!action)} className='text-[blue] font-[500] cursor-pointer'>{action ? 'Signup' : 'Login'}</span></p>
			</section>
		</div>
	)
}

export default Authentication