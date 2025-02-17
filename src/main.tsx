import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Login from './pages/Login/Login.tsx';
import NewEvent from './pages/NewEvent/newEvent.tsx';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import './index.css';
import EditEvent from './pages/EditEvent/EditEvent.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './utils/authContext.tsx';
import ProtectedRoute from './components/protectedRoute';
import EventView from './pages/EventView/EventView.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "cadastro", element: <Login /> },
      { 
        path: "newEvent", 
        element: (
          <ProtectedRoute>
            <NewEvent />
          </ProtectedRoute>
        )
      },
      { 
        path: "editEvent", 
        element: (
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        )
      },
      { 
        path: "EventView", 
        element: (
          <ProtectedRoute>
            <EventView />
            </ProtectedRoute>

        )
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
