import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { setEmail } from '../../Redux/Slice/authSlice';
import { signUpAsync } from '../../Redux/Actions/authActions';
import { BASE_URL } from '../../Api/api';
import { httpRequest } from '../../Api/api';
import {  GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authError = useSelector((state) => state.auth.error);
  const [userData, setUserData] = useState({
    email: '',
    fullname: '',
    username: '',
    password: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track registration success

  const handleGoogleSignIn = async (response) => {
    const googleToken = response.credential;
    console.log(googleToken) // Adjust this based on the actual structure of the response
    try {
       const response = await axios.post('http://127.0.0.1:8000/auth/login/google/', {
         token: googleToken
         
       }, {
         headers: {
           'Content-Type': 'application/json'
         }
       });
       console.log("Backend response:", response.data);
       // Handle the response, e.g., save the token and redirect the user
    } catch (error) {
       console.error("Google error:", error.response ? error.response.data : error.message);
    }
   };
   
  const handleSignup = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const trimmedFullName = userData.fullname.trim();
  
    if (!trimmedFullName) {
      alert('Full Name cannot be blank or contain only spaces');
      return;
    }
  
    setUserData({ ...userData, fullname: trimmedFullName });
    setIsSubmitting(true); // Set submitting state to true

    
    try {
      await dispatch(signUpAsync(userData, navigate));
      // Registration successful
      setRegistrationSuccess(true);
      dispatch(setEmail(userData.email));
    } catch (error) {
      // Handle registration error
      console.error('Registration failed:', error);
      setRegistrationSuccess(false);
    }
  };
  
  return (
    <div className="signup-page">
      <div className="signup-form">
        <h1>Signup</h1>
        {registrationSuccess && (
          <p style={{ color: 'green', textAlign: 'center' }}>Successfully registered!</p>
        )}
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Fullname"
            value={userData.fullname}
            onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          {authError && <p style={{ color: 'red', textAlign: 'center' }}>{authError}</p>}

          <div className="checkbox-container">
            <input type="checkbox" id="artisan" />
            <label htmlFor="artisan">Already have an account?</label>
            <div>
              <Link to="/">
                <button className="btn btn-primary">Login</button>
              </Link>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}>Register</button>
          <GoogleOAuthProvider clientId="331173960696-5r60tcf7mme4bku25mga0r8otirmte8e.apps.googleusercontent.com">
            <GoogleLogin  className="google-btn" buttonText="SignUp with Google"onSuccess={handleGoogleSignIn}
        onFailure={(error) => console.error('Google Sign-In failed', error)}   cookiePolicy={'single_host_origin'} type="submit" jsSrc="https://apis.google.com/js/api.js" />
          </GoogleOAuthProvider>
        </form>
      </div>
      <div className="artistic-element"></div>
    </div>
  );
};
