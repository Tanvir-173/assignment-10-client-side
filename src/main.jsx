import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Login from './Components/Login/Login.jsx';
import AddReview from './Components/AddReview/AddReview.jsx';
import PrivateRoute from './Routs/PrivateRoute.jsx';
import AllReviews from './Components/AllReviews/AllReviews.jsx';
import MyReviews from './Components/MyReviews/MyReviews.jsx';
import EditReview from './Components/EditReview/EditReview.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import MyFavorites from './Components/MyFavorites/MyFavorites.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component:App,
    children:[
      {
        path:"/",
        Component:Home
      },
      {
        path:'register',
        Component:Register
      },
      {
        path:'login',
        Component:Login
      },
      {
        path: "add-review",
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "my-favorites",  // NEW ROUTE
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
      {
        path:'All-Reviews',
        Component:AllReviews

      },
      {
        path: "edit-review/:id", // NEW ROUTE
        element: (
          <PrivateRoute>
            <EditReview />
          </PrivateRoute>
        ),
      },
      {
        
        path: "*",
        Component:NotFound,
      
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
 <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
