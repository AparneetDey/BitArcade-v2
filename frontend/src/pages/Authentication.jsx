import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink, useParams } from 'react-router';
import Spinner from '../components/Spinner.jsx'

const API_URL = import.meta.env.VITE_API_URL;

const Authentication = () => {
	const { mode } = useParams();
	const Navigate = useNavigate();


	const [action, setAction] = useState(mode === 'signup' ? false : true); /* false - Signup | true - Login */
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false)
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true)

		const endpoint = action ? 'login' : 'signup';
		const payload = action ?
			{ email: email, password: password }
			: { username: username, email: email, password: password };

		try {
			const response = await fetch(`${API_URL}/${endpoint}`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error('Response is not okay')
			}

			const data = await response.json();

			if (data.message === 'notRegistered') {
				console.log('Not Registered')
			} else if (data.message === 'registered') {
				console.log('Registered')
			} else {
				setInterval(()=> {
					Navigate('/');
					window.location.reload();
				}, 500);
			}

		} catch (error) {
			console.log(`Auth failed: ${error}`);
		} finally {
			setInterval(()=> {
				setIsLoading(false);
			}, 1000);
		}
	}

	useEffect(() => {
		setAction(mode === 'signup' ? false : true);
	}, [mode, Navigate])

	const toggleAuth = (q) => {
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
					
					<form onSubmit={handleSubmit} className='all-inputs'>
						{action ? '' :
							<div className='input'> {/* Username */}
								<p>Username</p>
								<input
									className='outline-none w-full border-[2px] border-[#000000]/75 rounded-full pl-3 '
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</div>
						}
						<div className='input'> {/* Email */}
							<p>Email</p>
							<input
								className='outline-none w-full border-[2px] border-[#000000]/75 rounded-full pl-3 '
								type="mail"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className='input'> {/* Password */}
							<p>Password</p>
							<input
								className='outline-none w-full border-[2px] border-[#000000]/75 rounded-full pl-3 '
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className='mt-4 flex justify-center items-center '>
							<button type='submit' className='btn'>
								{isLoading ? (<Spinner />) :  action ? 'Login' : 'Signup'}
							</button>
						</div>
					</form>
				</div>

				<p className='bottom'>Already a part of the Arcade? <span onClick={() => toggleAuth(!action)} className='text-[blue] font-[500] cursor-pointer'>{action ? 'Signup' : 'Login'}</span></p>
			</section>
		</div>
	)
}

export default Authentication