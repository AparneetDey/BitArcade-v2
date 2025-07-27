import React, { useState, useEffect } from 'react'

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router";

import Home from './pages/Home'
import Authentication from './pages/Authentication';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Spinner from './components/Spinner';


const API_URL = import.meta.env.VITE_API_URL;

const API_OPTION = {
	method: 'GET',
	credentials: 'include'
}

const App = () => {
	const [isSignedIn, setIsSignedIn] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [userData, setUserData] = useState([])

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

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} />,
		},
		{
			path: "/authentication/:mode",
			element: <ProtectedRoute isSignedIn={isSignedIn} page={'auth'} >
				<Authentication setIsSignedIn={setIsSignedIn} />
			</ProtectedRoute>
		},
		{
			path: "/profile",
			element: ( isSignedIn === null ? <Spinner /> :
				<ProtectedRoute isSignedIn={isSignedIn} page={'profile'} >
					<Profile searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} />
				</ProtectedRoute>)
		}
	]);

return (<RouterProvider router={router} />)
}

export default App