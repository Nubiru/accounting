import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
//import './index.css'
import RootLayout from './routes/RootLayout'
import Dashboard from './routes/Dashboard'
import Posts, { loader as postsLoader } from './routes/Posts'
import NewPost, { action as newPostAction } from './routes/NewPost'
import PostDetails, {
  loader as postLoader,
  action as editPostAction
} from './routes/PostDetails'

// import App from './App'
// import Customers from './features/user/Customers'
// import CreateUser from './features/user/CreateUser'
// import Authentication from './features/user/Authentication'

// Here is where we can list all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        children: [
          {
            path: '/',
            element: <Posts />,
            loader: postsLoader,
            children: [
              {
                path: '/create-post',
                element: <NewPost />,
                action: newPostAction
              },
              {
                path: '/:id',
                element: <PostDetails />,
                action: editPostAction,
                loader: postLoader
              }
            ]
          }
        ]
      }
    ]
  }
  // {
  //   path: '/',
  //   element: <App />,
  //   children: [
  //     { path: '/customers', element: <Customers /> },
  //     { path: '/create-user', element: <CreateUser /> },
  //     { path: '/auth', element: <Authentication /> }
  //   ]
  // }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
