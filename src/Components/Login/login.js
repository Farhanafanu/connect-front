import React, { useEffect, useState } from "react";
import './login.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/Actions/authActions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const error = useSelector((state) => state.auth.error);
  const [password, setPassword] = useState('');
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      console.log("Token:", token);
      console.log("Authorization:", token.jwt);
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>Connect Sphere</h2>
        </div>
        <form className='right' onSubmit={handleLogin}>
          <input
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='btn login-btn' type='submit'>Login</button>
          <span>Don't Have an Account?</span>
          <Link to='/signup'>
            <button className='btn login-btn'>Register</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
