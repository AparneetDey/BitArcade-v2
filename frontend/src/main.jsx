import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";

import './index.css'
import Home from './pages/Home'
import Authentication from './pages/Authentication';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/authentication/:mode",
        element: <Authentication />
    }
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
