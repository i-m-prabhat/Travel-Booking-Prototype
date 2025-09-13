import './App.css'
import { indexRouter } from './router';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import { Login } from './pages';



const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  ...indexRouter
], { basename: import.meta.env.VITE_PUBLIC_URL || '/' });


function App()
{
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
