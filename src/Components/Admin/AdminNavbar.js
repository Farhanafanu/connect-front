// AdminNavbar.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../Redux/Slice/authSlice';
import { useNavigate, NavLink as RouterNavLink } from 'react-router-dom';

function AdminNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(adminLogout());
        navigate('/admin'); // Modify this as per your login route.
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-black" style={{ width: '100%', height: '60px', marginBottom: '0' }}>
            <div className="container-fluid">
                <span className="navbar-brand"></span>
                <div className="d-flex align-items-center">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        style={{ width: '8cm', marginRight: '1rem' }}  // Set the width to 8cm and add right margin for space
                    />
                    <RouterNavLink to="/admin" onClick={handleLogout} className="nav-link bg-white" >
                        Logout
                    </RouterNavLink>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;
