import './App.css'
import { indexRouter } from './router';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import { Login, Register } from './pages';
import LoginLayout from './layouts/LoginLayout';
import { AuthProvider } from './contexts/AuthContext';
import Error from './pages/Error';



const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      { index: true, element: <Login /> },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  ...indexRouter,
  {
    path: "*",
    element: <Error />
  }
], { basename: import.meta.env.VITE_PUBLIC_URL || '/' });


function App()
{
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  )
}

export default App
