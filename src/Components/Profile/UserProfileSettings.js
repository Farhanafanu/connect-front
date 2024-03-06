/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState, Fragment } from "react";
import "./userprofile.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFeed,
  faMessage,
  faSignOut,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Api/api";
import axios from "axios";
import { setUser, userLogout } from "../../Redux/Slice/authSlice";
import { Transition, Dialog } from "@headlessui/react";

export default function UserProfile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(userData?.user?.username || "");
  const [location, setLocation] = useState(
    userData?.user_profile?.location || ""
  );
  const [bio, setBio] = useState(userData?.user_profile?.bio || "");
  const [dob, setDob] = useState(userData?.user_profile?.date_of_birth || "");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [userProfileId,setuserProfileId] = useState();

  useEffect(() => {
    if(token){
      axios
      .get(`${BASE_URL}/userdata/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        const userData = response.data;
        setUserData(userData);
        dispatch(setUser(userData));
        setuserProfileId(userData.user.id)
        setUsername(userData?.user?.username || "");
        setLocation(userData?.user_profile?.location || "");
        setBio(userData?.user_profile?.bio || "");
        setDob(userData?.user_profile?.date_of_birth || "");
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
    } else{
      navigate('/')
    }
  }, [token, dispatch,navigate]);

  
  console.log("---",userProfileId)


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    dispatch(userLogout());
    console.log("Success");
    navigate("/");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form")
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('location', location);
    formData.append('bio', bio);
    formData.append('date_of_birth', dob);
    if (profilePhoto) {
       formData.append('profile_photo', profilePhoto);
    }
    if (coverPhoto) {
       formData.append('cover_photo', coverPhoto);
    }
   
    try {
       // Use Axios to send the POST request
       const response = await axios.post(`http://127.0.0.1:8000/userupdate/${userProfileId}/`, formData, {
         headers: {
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'multipart/form-data', 
         },
         withCredentials: true,
       });
   
       console.log(response.data);
  
       const updatedUserDataResponse = await axios.get(`${BASE_URL}/userdata/`, {
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
         withCredentials: true,
       });
   
       const updatedUserData = updatedUserDataResponse.data;
   
       setUserData(updatedUserData);
       dispatch(setUser(updatedUserData));
       setuserProfileId(updatedUserData.user_profile.id);
       setUsername(updatedUserData?.user?.username || "");
       setLocation(updatedUserData?.user_profile?.location || "");
       setBio(updatedUserData?.user_profile?.bio || "");
       setDob(updatedUserData?.user_profile?.date_of_birth || "");
   
       closeModal();
    } catch (error) {
       console.error('There has been a problem with your Axios operation:', error);
    }
   };
   

  const isOwnProfile =
    currentUser && userData && currentUser.user.id === userData.user.id;

    return (
      <div className="userProfile">
        <div className="cover-photos">
          {currentUser && currentUser.user_profile && currentUser.user_profile.cover_photo ? (
            <img src={`${BASE_URL}${currentUser.user_profile.cover_photo}`} alt="" className="img-fluid" />
          ) : (
            <img src="" alt="No cover Photo" className="img-fluid" />
          )}
        </div>
        <div className="profile-info">
          {currentUser && currentUser.user_profile && currentUser.user_profile.profile_image ? (
            <img src={`${BASE_URL}${currentUser.user_profile.profile_image}`} alt="" className="img-fluid" />
          ) : (
            <img src="" alt="No Profile Photo" className="img-fluid" />
          )}
    
    <div className="user-name">
    

  {currentUser && currentUser.user && currentUser.user.username ? (
    <h5>{currentUser.user.username}</h5>
  ) : (
    <input type="text" className="form-control" placeholder="Update username" />
  )}

  <div className="user-location">
    {currentUser && currentUser.user_profile && currentUser.user_profile.location ? (
      <h5>{currentUser.user_profile.location}</h5>
    ) : (
      <input type="text" className="form-control" placeholder="Update location" />
    )}
  </div>
  <h5 className="bio">
    {userData && userData.user_profile && userData.user_profile.bio ? (
      userData.user_profile.bio
    ) : (
      <input type="text" className="form-control" placeholder="Update bio" />
    )}
  </h5>
</div>

    
          <div className="profile-button">
            <Link to="" className="btn btn-primary">
              <FontAwesomeIcon icon={faTrashAlt} /> DeleteAccount
            </Link>
           
            <button className="btn btn-primary" onClick={openModal}>
              <FontAwesomeIcon icon={faEdit} /> Update Profile
            </button>
    
            <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Profile</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleFormSubmit}>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </div>
                      {/* Add other form fields */}
                      <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="bio" className="form-label">Bio</label>
                        <textarea className="form-control" id="bio" rows="3" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input type="text" className="form-control" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="newProfilePhoto" className="form-label">Current Profile Photo</label>
                        {currentUser && currentUser.user_profile && currentUser.user_profile.profile_image ? (
                          <img src={`${BASE_URL}${currentUser.user_profile.profile_image}`} alt="Current Profile Photo" className="img-fluid mt-2" style={{ maxWidth: "100%" }} />
                        ) : (
                          <p>No profile photo available</p>
                        )}
                        <input type="file" className="form-control" id="newProfilePhoto" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files[0])} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="newCoverPhoto" className="form-label">Current Cover Photo</label>
                        {currentUser && currentUser.user_profile && currentUser.user_profile.cover_photo ? (
                          <img src={`${BASE_URL}${currentUser.user_profile.cover_photo}`} alt="Current Cover Photo" className="img-fluid mt-2" style={{ maxWidth: "100%" }} />
                        ) : (
                          <p>No cover photo available</p>
                        )}
                        <input type="file" className="form-control" id="newCoverPhoto" accept="image/*" onChange={(e) => setCoverPhoto(e.target.files[0])} />
                      </div>
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                      <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
    
            <button className="btn btn-primary" onClick={(e) => handleLogout(e)}>
              <FontAwesomeIcon icon={faSignOut} /> Logout
            </button>
          </div>
         
        </div>
      </div>
    );
    
}
