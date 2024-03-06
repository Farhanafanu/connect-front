import React from 'react';
import './rightbar.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'; 

export default function RightBar() {
  const navigate = useNavigate();

  const goToFriendRequest = () => {
    navigate('/friend-request'); // Use the path you've defined in your route configuration
  };

  return (
    <div className="rightBar" style={{ backgroundColor: '#F0F2F5', color: 'black' }}>
      <div className="rightbar-container">
        {/* Other content */}
        <button onClick={goToFriendRequest} style={{  color: 'blueviolet', padding: '20px' }}>
          <FontAwesomeIcon icon={faUserFriends} style={{ marginRight: '8px' }} /> {/* Add the icon */}
          Friend Request
        </button>
        {/* Other content */}
      </div>
    </div>
  );
}
