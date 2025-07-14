import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";

import './index.css'
import Home from './pages/Home'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/authentication/login",
        element: <div>Login</div>
    }
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
