import React, { useState, useEffect } from 'react'

import {
	createBrowserRouter,
	RouterProvider,
	useLocation,
} from "react-router";

import Home from './pages/Home'
import Authentication from './pages/Authentication';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { useDebounce } from 'react-use';
import GamePreview, { GameLoader } from './pages/GamePreview';
import Genres from './pages/Genres';
import authservice from './appwrite/auth';

const API_URL = import.meta.env.VITE_API_URL;

// Component to track current page
const PageTracker = ({ children }) => {
	const location = useLocation();
	
	useEffect(() => {
		// Save current page to localStorage
		localStorage.setItem('lastVisitedPage', location.pathname);
	}, [location]);
	
	return children;
};

const App = () => {

	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
	const [genre, setGenre] = useState('')
	const [isSignedIn, setIsSignedIn] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [userData, setUserData] = useState({});

	useDebounce(() =>
		setDebouncedSearchTerm(searchTerm),
		700,
		[searchTerm]
	)

	const postUser = async () => {
		try {
			const session = await authservice.getCurrentUser();

			const response = await fetch(`${API_URL}/session`, {
				method: 'POST',
				headers:{
					'content-type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({user: session}),
			});

			if (!response.ok) {
				throw new Error('Response is not okay');
			}

			const data = await response.json();

			setIsSignedIn(data.success);
		} catch (error) {
			console.log(`Error posting user to backend: ${error}`)
			setIsSignedIn(false);
		}
	}

	const fetchUser = async () => {
		try {
			const response = await fetch(`${API_URL}/user`, {
				method: "GET",
				headers: {
					"content-type": "application/json"
				},
				credentials: "include"
			});

			if(!response.ok){
				throw new Error('Response is not okay');
			}

			const data = await response.json();

			if(Object.keys(data.user).length === 0){
				setUserData({});
				setIsSignedIn(false);
				return
			}

			setUserData(data.user);
			setIsSignedIn(true);
		} catch (error) {
			console.log('Error fetching user form backend: ',error);
			setIsSignedIn(false);
		}
	}

	// Initial auth check on app load
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const session = await authservice.getCurrentUser();
				if (session) {
					await postUser();
				} else {
					setIsSignedIn(false);
				}
			} catch (error) {
				console.log('Auth check failed:', error);
				setIsSignedIn(false);
			} finally {
				setIsLoading(false);
			}
		};
		
		checkAuth();
	}, []);

	// Fetch user data when auth state changes
	useEffect(() => {
		if (isSignedIn !== null && !isLoading) {
			fetchUser();
		}
	}, [isSignedIn, isLoading])

	const router = createBrowserRouter(
		[
			{
				path: '/',
				element: <PageTracker><Home
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					userData={userData}
					debouncedSearchTerm={debouncedSearchTerm}
				/></PageTracker>
			},
			{
				path: "authentication/:mode",
				element: (
					<PageTracker><ProtectedRoute isSignedIn={isSignedIn} isLoading={isLoading} page="auth">
						<Authentication />
					</ProtectedRoute></PageTracker>
				),
			},
			{
				path: "profile",
				element: (
					<PageTracker><ProtectedRoute isSignedIn={isSignedIn} isLoading={isLoading} page="profile">
						<Profile
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
							userData={userData}
							debouncedSearchTerm={debouncedSearchTerm}
						/>
					</ProtectedRoute></PageTracker>
				),
			},
			{
				path: "game/:slug",
				element: (
					<PageTracker><GamePreview
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						userData={userData}
						isSignedIn={isSignedIn}
						debouncedSearchTerm={debouncedSearchTerm}
					/></PageTracker>
				),
				loader: GameLoader,
			},
			{
				path: "genres",
				element: (
					<PageTracker><Genres
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						userData={userData}
						genre={genre}
						setGenre={setGenre}
						debouncedSearchTerm={debouncedSearchTerm}
					/></PageTracker>
				)
			}
		]);


	return (<RouterProvider router={router} />)
}

export default App