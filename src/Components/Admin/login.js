import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogin} from '../../Redux/Slice/authSlice';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await fetch('http://127.0.0.1:8000/connectadmin/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email:username,
          password,
        }),
      });
  
  
      const data = await response.json();
      console.log(data.error);
      setError(data.error)
  
      switch (data.error) {
        case 'Both email and password required':
        case 'Incorrect Password':
        case 'Admin Access is required':
          setError(data.error);
          break;
  
        default:
          if (!data.error) {
            console.log('Loginnnn');
            dispatch(adminLogin(data))
            navigate('/adminhome');
          }
          break;
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  const imageUrl ='data:image/jpeg;base64,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'
  return (
    
    <div className="d-flex vh-100">
      {/* Left side with image */}
      
      <div
    className="w-100 d-flex flex-column align-items-center justify-content-center"
    style={{ backgroundColor: 'black' }} // Changed this to black
  >
      {/* Right side with form */}
     
        <h2 className="text-white mb-4 ">Admin Login</h2>
        <form className="w-50 p-0" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white" htmlFor="username">
              Username:
            </label>
            <input
              className="form-control"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'white' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white" htmlFor="password">
              Password:
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'white' }}
            />
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error!</strong> {error}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-outline-light w-100"
            style={{ color: 'black', backgroundColor: 'white' }}
          >
            Sign in
          </button>
        </form>
      </div>
      <div
        className="w-50 mr-20"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'contain', // Use 'contain' to maintain aspect ratio
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#000000',
          position: 'relative',
          height: '100%',
          paddingRight: '20px',  // Ensure the image container takes up the full height
        }}
      />
    </div>
  );
  
  };
  


export default AdminLogin;
