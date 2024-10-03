import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NewPost from './features/post/NewPost'
import RootLayout from './layouts/RootLayout'
import Customers from './features/user/Customers'
import CreateUser from './features/user/CreateUser'
import Authentication from './features/user/Authentication'
import PostsList from './features/post/PostsList'
import CreatePost from './features/post/CreatePost'

// Here is where we can list all routes
const router = createBrowserRouter([
  {
    path: '/*',
    element: <RootLayout />
  },
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/customers', element: <Customers /> },
      { path: '/create-user', element: <CreateUser /> },
      { path: '/auth', element: <Authentication /> }
    ]
  },
  {
    path: '/',
    element: <PostsList />,
    children: [
      { path: '/create-post', element: <CreatePost /> }
      // { path: '/edit-post', element: <EditPost /> }
    ]
  }
  // {
  //   path: '/',
  //   element: <News />,
  //   children: [
  //     { path: '/create-new', element: <CreateNew /> },
  //     { path: '/edit-new', element: <EditNew /> }
  //   ]
  // },
  // {
  //   path: '/files',
  //   element: <Files />,
  //   children: [
  //     { path: '/files/upload', element: <Upload /> },
  //     { path: '/files/navigate', element: <Folders /> }
  //   ]
  // }
])

// { path: '/', element: <App /> , children: [
//  { path: '/customers', element: <Customers /> },
//  { path: '/create-user', element: <CreateUser /> }
// ]}
// { path: '/', element: <Posts />, children: [
//   { path: '/create-post', element: <CreatePost />},
//   { path: '/edit-post', element: <EditPost /> }
// ]}
// { path: '/', element: <News />, children: [
//   { path: '/create-new', element: <CreateNew /> },
//   { path: '/edit-new', element: <EditNew /> },
// ]}
// { path: '/files', element: <Files />, children: [
//   { path: '/files/upload', element: <Upload /> },
//   { path: '/files/navigate', element: <Folders />}
// ]}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

/*
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

*/
