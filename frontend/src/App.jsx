import React, { useState, useEffect } from 'react'

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router";

import Home from './pages/Home'
import Authentication from './pages/Authentication';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { useDebounce } from 'react-use';
import GamePreview, { GameLoader } from './pages/GamePreview';
import Genres from './pages/Genres';

const API_URL = import.meta.env.VITE_API_URL;

const API_OPTION = {
	method: 'GET',
	credentials: 'include'
}

const App = () => {

	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
	const [isSignedIn, setIsSignedIn] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [userData, setUserData] = useState([]);

	useDebounce(() =>
		setDebouncedSearchTerm(searchTerm),
		700,
		[searchTerm]
	)

	const fetchUser = async () => {
		try {
			const response = await fetch(`${API_URL}/user`, API_OPTION);

			if (!response.ok) {
				throw new Error('Response is not okay');
			}

			const data = await response.json();

			if (data.data.length === 0) {
				setUserData([]);
				return;
			}

			setUserData(data.data);
			setIsSignedIn(data.isSignedIn);
		} catch (error) {
			console.log(`Error fetching user from backend: ${error}`)
			setIsSignedIn(false);
		}
	}

	useEffect(() => {
		fetchUser();
	}, [])

	const router = createBrowserRouter(
		[
			{
				path: '/',
				element: <Home
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					userData={userData}
					debouncedSearchTerm={debouncedSearchTerm}
				/>
			},
			{
				path: "authentication/:mode",
				element: (
					<ProtectedRoute isSignedIn={isSignedIn} page="auth">
						<Authentication setIsSignedIn={setIsSignedIn} />
					</ProtectedRoute>
				),
			},
			{
				path: "profile",
				element: (
					<ProtectedRoute isSignedIn={isSignedIn} page="profile">
						<Profile
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
							userData={userData}
							debouncedSearchTerm={debouncedSearchTerm}
						/>
					</ProtectedRoute>
				),
			},
			{
				path: "game/:slug",
				element: (
					<GamePreview
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						userData={userData}
						isSignedIn={isSignedIn}
						debouncedSearchTerm={debouncedSearchTerm}
					/>
				),
				loader: GameLoader,
			},
			{
				path: "genres",
				element: <Genres searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData}/>
			}
		]);


	return (<RouterProvider router={router} />)
}

export default App