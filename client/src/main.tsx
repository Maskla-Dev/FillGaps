import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeLogin from "./pages/EmployeeLogin.tsx";

const router = createBrowserRouter( [
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/login",
        element: <EmployeeLogin/>,
    }
] );

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
