// AdminSidebar.js
import React from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';

function AdminSidebar() {
    const location = useLocation();

    return (
        <div className="d-flex flex-column" style={{ height: '300vh', padding: '0', margin: '0' }}>
            <div className="d-flex" style={{ flex: 1 }}>
                <div className="d-flex flex-column flex-shrink-0 p-3 bg-black" style={{ padding: '0', margin: '0' }}>
                    <span className="fs-4 fw-bold" style={{ color: 'white' }}>Connect -Sphere</span>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <RouterNavLink to="/adminhome" className={`nav-link ${location.pathname === "/admin/dashboard" ? "active" : ""}`} style={{ color: 'white' }}>
                                Dashboard
                            </RouterNavLink>
                        </li>
                        <li>
                            <RouterNavLink to="/userslist" className={`nav-link ${location.pathname === "/admin/users" ? "active" : ""}`} style={{ color: 'white' }}>
                                Users
                            </RouterNavLink>
                        </li>
                        <li>
                            <RouterNavLink to="/postlist" className={`nav-link ${location.pathname === "/admin/posts" ? "active" : ""}`} style={{ color: 'white' }}>
                                Posts
                            </RouterNavLink>
                        </li>
                        <li>
                            <RouterNavLink to="/admin/reports" className={`nav-link ${location.pathname === "/admin/reports" ? "active" : ""}`} style={{ color: 'white' }}>
                                Reports
                            </RouterNavLink>
                        </li>
                        {/* ... other links as needed */}
                    </ul>
                </div>
                <div className="flex-grow-1 p-3">
                    {/* Main content */}
                    {/* ... */}
                </div>
            </div>
        </div>
    );
}

export default AdminSidebar;
