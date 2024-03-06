import React, { useSelector } from 'react-redux'
import {  Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'


//Pages................

import { Signup } from '../Signup/Signup'
import Verification from '../Verification/Verify'
import Login from '../Login/login'
import Home from '../Home/Home'
import Navbar from '../Navbar/NavBar'
import AdminLogin from '../Admin/login'
import AdminHome from '../Admin/AdminHome'
import UserList from '../Admin/UserList'
import Users from '../Admin/Users'
import RightBar from '../RightBar/Rightbar'
import LeftBar from '../LeftBar/LeftBar'
import Profile from '../Profile/Profile'
import Settings from '../Profile/UserProfilePage'
import Posts from '../Admin/Posts'

const Feed = () => {
  return (
    <>
    <Navbar />
    <main>
      <LeftBar />
      <div className="container">
        <Outlet />
      </div>
      <RightBar />
    </main>
    </>
  )
}

export default function LayOut() {


  const router = createBrowserRouter([
    
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path:'/verify',
      element:<Verification/>

    },{
      path:'/',
      element:<Login/>
    },
    {
      path : '/admin',
      element : <AdminLogin />,
    },
    {
      path : '/adminhome',
      element : <AdminHome />
    },
    {
      path : '/userslist',
      element : <Users />
    },
    {
      path: '/postlist',
      element : <Posts />
    },
    {
      path: '/settings',
      element: <Settings />
    },

    {
      path: '/home', 
      element: <Feed />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        
       
        
      ]
    }
   
    
   
  ])


  return (
    <>
        <RouterProvider router = {router} />
    </>
  )
}
