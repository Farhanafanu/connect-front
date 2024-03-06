import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from "react-router-dom";

const LeftBar = () => {
  const navigate = useNavigate();
  
  const goToUserProfile = () => {
    navigate('/settings'); // Use the path you've defined in your route configuration
  };

  return (
    <div className="left-bar" style={{ backgroundColor: '#F0F2F5', color: 'blac', padding: '20px' }}>
      {/* Other content */}
      <button onClick={goToUserProfile} style={{ color: 'blueviolet' }}>
        <FontAwesomeIcon icon={faCog} /> {/* Use the cog icon */}
        Settings
      </button>
      
          
      {/* Other content */}
    </div>
  );
};

export default LeftBar;
