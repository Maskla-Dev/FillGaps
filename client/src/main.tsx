import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, Login } from './components/pages/Pages'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import { store } from "./utils/appstate/store.ts";
import { Provider } from "react-redux"
import Chat from "./components/pages/Chat.tsx";
import Channel from "./components/pages/Channel.tsx";

const router = createBrowserRouter( [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <h1>Panel</h1>
            },
            {
                path: 'chat',
                element: <Chat/>
            },
            {
                path: 'chat/channel/:channel_name',
                element: <Channel/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    }
] )

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
