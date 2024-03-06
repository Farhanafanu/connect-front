import React,{useEffect,useState,useref} from 'react'
import './Navbar.css';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faSearch, faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";
import {useSelector} from 'react-redux'
import axios from 'axios'
import {BASE_URL} from '../../Api/api'
export default function Navbar(){
  const CurrentUser=useSelector((state)=>state.auth.user);

  return(
    <nav>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/">
          <h3 className="logo" ><strong>Connect-Sphere</strong></h3>
          </Link>
          <Link to="/home">
          <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link to="/home/profile">
          <FontAwesomeIcon icon={faUser} />
          </Link>
          <div className="Nav-Searchbar">
            <input
              type="text"
              placeholder="Search for users..."
            /> 
          </div>
        </div>
        <div className="nav-right">
          <Link to='/chat'>
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
          <Link to='/notifcation'>
            <FontAwesomeIcon icon={faBell} />
          </Link>
         
          
          <div className="user" style={{color:'white'}}>
            {CurrentUser && CurrentUser.user_profile ? (
              <img
                src={`${BASE_URL}${CurrentUser.user_profile.profile_image}`}
                alt="Profile Image"
                className="profile-image" // Add a class for styling if needed
              />
            ) : null}
            <h5 style={{ marginLeft: "10px" ,color:"white"}}>
              {CurrentUser?.user?.username}
            </h5>
            {/* Add other user details here as needed */}
          </div>
         
        </div>

        

      </div>
    </nav>
  )
}