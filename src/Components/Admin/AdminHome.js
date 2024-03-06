import React,{useEffect} from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './Adminsidebar';
import PostList from './listPost'


import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AdminHome(){
    const admin_token=useSelector((state)=>state.auth.admin_token)
    console.log("AdminToken:",admin_token)
    const navigate=useNavigate()
    useEffect(()=>{
        if(!admin_token){
            navigate('/admin')
        }

    })
    return(
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AdminNavbar />
        <div style={{ display: 'flex', flex: 1 }}>
          <AdminSidebar />
         
        </div>
      </div>
    );
}