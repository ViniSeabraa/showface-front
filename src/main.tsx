import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from './pages/Login/Login.tsx'
import NewEvent from './pages/NewEvent/newEvent.tsx'
import './index.css'
import EditEvent from './pages/EditEvent/EditEvent.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './utils/authContext.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "cadastro", element: <Login/> },
      { path: "newEvent", element: <NewEvent/> },
      { path: "editEvent", element: <EditEvent/> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
)