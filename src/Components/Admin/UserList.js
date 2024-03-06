import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/connectadmin/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const onBlockUnblockClick = (userId, action) => {
    setSelectedUserId(userId);
    setActionType(action);
    setShowConfirmationModal(true); // This will trigger the modal to display
  };

  const handleConfirmation = async () => {
    try {
      const blockUnblockResponse = await axios.post(`http://127.0.0.1:8000/connectadmin/block_unblock_user/${selectedUserId}/`);
      console.log("Response:", blockUnblockResponse);
      console.log(`Confirmed ${actionType} for user ${selectedUserId}`);

      // Fetch the updated users list
      const response = await axios.get('http://127.0.0.1:8000/connectadmin/users/');
      setUsers(response.data);

      // Close the modal
      setShowConfirmationModal(false);
      setSelectedUserId(null);
      setActionType('');
    } catch (error) {
      console.error('Error handling confirmation:', error);
    }
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedUserId(null);
    setActionType('');
  };

  return (
    <>
      <div className="text-center mb-4" style={{ marginTop: '50px' }}>
        <h1>User Management</h1>
      </div>
      <div className="container">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.is_active ? 'Yes' : 'No'}</td>
                <td>
                  {user.is_active ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => onBlockUnblockClick(user.id, 'Block')}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => onBlockUnblockClick(user.id, 'Unblock')}
                    >
                      Unblock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={closeConfirmationModal}
        onConfirm={handleConfirmation}
        actionType={actionType}
      />
    </>
  );
};

export default React.memo(UsersList);
