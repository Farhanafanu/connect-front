import React from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './Adminsidebar'; // Contains the top bar and sidebar
import UserList from './UserList'; // Contains the "User Management" content
import './Users.css';
import AdminHome from './AdminHome';

function Users() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AdminNavbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <AdminSidebar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <UserList />
        </div>
      </div>
    </div>

  );
}
export default Users