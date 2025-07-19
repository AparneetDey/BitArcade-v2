import React, { useState, useEffect } from 'react'

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router";

import Home from './pages/Home'
import Authentication from './pages/Authentication';
import Profile from './pages/Profile';


const API_URL = import.meta.env.VITE_API_URL;

const API_OPTION = {
  method: 'GET',
  credentials: 'include'
}

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [userData, setUserData] = useState({})

	const fetchUser = async () => {
		try {
			const response = await fetch(`${API_URL}/user`, API_OPTION);

			if (!response.ok) {
				throw new Error('Response is not okay');
			}

			const data = await response.json();

			console.log(data.data)

			if (data.data.length === 0) {
				setUserData([]);
				return;
			}

			setUserData(data.data);

		} catch (error) {
			console.log(`Error fetching user from backend: ${error}`)
		}
	}

	useEffect(() => {
		fetchUser()
	}, [])

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} />,
		},
		{
			path: "/authentication/:mode",
			element: <Authentication />
		},
		{
			path: "/profile",
			element: <Profile searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} />
		}
	]);

	return (<RouterProvider router={router} />)
}

export default App