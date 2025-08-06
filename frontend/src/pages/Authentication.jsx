import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink, useParams } from 'react-router';
import Spinner from '../components/Spinner.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import authservice from '../appwrite/auth.js';

const API_URL = import.meta.env.VITE_API_URL;

const Authentication = () => {
	const { mode } = useParams();
	const Navigate = useNavigate();


	const [action, setAction] = useState(mode === 'signup' ? false : true); /* false - Signup | true - Login */
	const [authErrorMessage, setAuthErrorMessage] = useState('');
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false)
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setAuthErrorMessage('');

		try {
			const logIn = action ?
			await authservice.logIn({email,password})
			: await authservice.createAccount({email, password, username});

			const response = await fetch(`${API_URL}/login`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({'login': logIn}),
			});

			if (!response.ok) {
				throw new Error('Response is not okay')
			}

			const data = await response.json();

			if(data.errorMessage === ''){
				Navigate('/');
				window.location.reload();
			}

			setAuthErrorMessage(data.errorMessage || '');

		} catch (error) {
			console.log(`Auth failed: ${error}`);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		setAction(mode === 'signup' ? false : true);
	}, [mode, Navigate])

	const toggleAuth = (q) => {
		const newMode = q ? 'login' : 'signup';
		Navigate(`/authentication/${newMode}`);
		setAuthErrorMessage('');
	}

	const bgImage = action ? '/login-bg.png' : '/signup-bg.png'

	return (
		<div className='authentication'>
			<ScrollToTop />
			<section>
				<div className='auth-poster'>
					<img src={bgImage} alt={action ? 'Login BG' : 'Signup BG'} />
				</div>
				<NavLink to={'/'}>
					<img className='cross-icon' src="/cross.svg" alt="Cross Icon" />
				</NavLink>
				<div className={`heading ${action ? 'top-[35%]' : 'top-[25%]'}`}>
					<h2>{action ? "Welcome back, let's get you back in the game." : 'Join the arcade — explore, discover, and track your favorite games.'}</h2>
				</div>
				<div className='input-fields'>
					<form onSubmit={handleSubmit} className='all-inputs'>
						<p className='text-[red] text-[12px] '>{authErrorMessage}</p>
						{action ? '' :
							<div className='input'> {/* Username */}
								<p>Username</p>
								<input
									className='outline-none w-full border-[2px] border-[#000000]/75 rounded-full pl-3 '
									name='username'
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
								name='email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						<div className='input'> {/* Password */}
							<p>Password</p>
							<input
								className='outline-none w-full border-[2px] border-[#000000]/75 rounded-full pl-3 '
								name='password'
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<div className='mt-4 flex justify-center items-center '>
							<button type='submit' className='btn'>
								{isLoading ? (<Spinner />) : action ? 'Login' : 'Signup'}
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