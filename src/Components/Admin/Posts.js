import React from 'react';
import AdminNavbar from './AdminNavbar';
import PostList from './listPost';
import AdminSidebar from './Adminsidebar';

function Posts() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AdminNavbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <AdminSidebar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <PostList />
        </div>
      </div>
    </div>
  );
}

export default Posts;

