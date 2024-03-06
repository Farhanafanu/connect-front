import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faComment,
  faPencilAlt,
  faTrash,
  faHeart,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './feeds.css'
import { updatePost } from "../../Redux/Slice/postSlice";

export default function Feed({ post, onRemovePost, onEditPost }) {
  
  const CurrentUserData = useSelector((state) => state.auth.user); 
  const userId = post?.user;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  // const [editedImages, setEditedImages] = useState(post.images || []);
  // const [editedVideos, setEditedVideos] = useState(post.videos || []);
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  

  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("user", userId);
    formData.append("id", post.id);
    formData.append("content", editedContent);
  
    // // Append new images only
    // Array.from(editedImages).forEach((image, index) => {
    //   formData.append(`images[${index}]`, image);
    // });
  
    // Array.from(editedVideos).forEach((video, index) => {
    //   formData.append(`videos[${index}]`, video);
    // });
  
    try {
      const response = await axios.put(
        `${BASE_URL}/updatepost/${post.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      dispatch(updatePost(post.id, userId, response.data));
      onEditPost(response.data);
      setIsEditing(false);
      // Reset editedImages state with the new images
      // setEditedImages([]);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/updatepost/${post.id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onRemovePost(post.id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="feed">
        <div className="top-content">
         
            <div className="user">
              {CurrentUserData && CurrentUserData.user_profile ? (
                <img
                  src={`${BASE_URL}${CurrentUserData.user_profile.profile_image}`}
                  alt=""
                />
              ) : null}
              <div className="div">
                {CurrentUserData && CurrentUserData.user ? (
                  <h5 style={{ marginLeft: "10px", color:"blueviolet" }}>
                    {CurrentUserData.user.username}
                  </h5>
                ) : null}
                <small style={{ marginLeft: "10px" }}>
                  {new Date(post.created_at).toLocaleString()}
                </small>
              </div>
            </div>
          
          <div>
            <span>
              <FontAwesomeIcon
                icon={faTrash} style={{color:'blueviolet'}}
                className="cursor-pointer"
                onClick={handleDeleteClick}
              />
            </span>
          </div>
        </div>
        <div className="content">{post.content}</div>

        <div className="media">
          {/* Display Images */}
          {post.images &&
            post.images.length > 0 &&
            post.images.map((image, index) => (
              <img
                key={index}
                src={`${BASE_URL}${image.images_url}`}
                alt={`Image ${index}`}
                className="media-item"
              />
            ))}

          {/* Display Videos */}
          {post.videos &&
            post.videos.length > 0 &&
            post.videos.map((video, index) => (
              <video key={index} controls className="media-item">
                <source
                  src={`${BASE_URL}${video.video_url}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ))}
        </div>

        <div className="bottom-content">
          <div className="action-item" >
            <span >
              <FontAwesomeIcon icon={faHeart} style={{color:'blueviolet'}}/>
               Likes
            </span>
          </div>
          <div className="action-item" >
            <span>
              <FontAwesomeIcon icon={faComment}  style={{color:'blueviolet'}}/>Comments
            </span>
          </div>
          <div className="action-item" onClick={handleEditClick}>
            <span>
              <FontAwesomeIcon icon={faPencilAlt}  style={{color:'blueviolet'}}/>
              Edit
            </span>
          </div>
        </div>

        {/* Edit Post Modal */}
        <Modal show={isEditing} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <label htmlFor="editedContent" className="form-label">
                  Content
                </label>
                <textarea
                  className="form-control"
                  id="editedContent"
                  rows="3"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                ></textarea>
              </div>
              {/* <div className="mb-3">
                <label htmlFor="editedImages" className="form-label">
                  Current Images
                </label>
                {post.images && post.images.length > 0 ? (
                  post.images.map((image, index) => (
                    <div key={index} className="mt-2 rounded-md">
                      <img
                        src={`${BASE_URL}${image.images_url}`}
                        alt={`Current Image ${index}`}
                        style={{ maxWidth: "100%" }}
                      />
                      <p>Click to change:</p>
                    </div>
                  ))
                ) : (
                  <p>No images available</p>
                )} */}
                {/* <input
            //       type="file" */}
            {/* //       className="form-control"
            //       id="editedImages"
            //       accept="image/*"
            //       multiple
            //       onChange={(e) => setEditedImages(e.target.files)}
            //     />
            //   </div> */}

              {/* <div className="mb-3">
                <label htmlFor="editedVideos" className="form-label">
                  Current Videos
                </label>
                {post.videos && post.videos.length > 0 ? (
                  post.videos.map((video, index) => (
                    <div key={index} className="mt-2 rounded-md">
                      <video
                        controls
                        className="mt-2 rounded-md"
                        style={{ maxWidth: "100%" }}
                      >
                        <source
                          src={`${BASE_URL}${video.video_url}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <p>Click to change:</p>
                    </div>
                  ))
                ) : (
                  <p>No videos available</p>
                )}
                <input
                  type="file"
                  className="form-control"
                  id="editedVideos"
                  accept="video/*"
                  multiple
                  onChange={(e) => setEditedVideos(e.target.files)}
                />
              </div> */}

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button
                variant="secondary"
                style={{ marginLeft: "20px" }}
                onClick={handleCloseEditModal}
              >
                Close
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        {/* Delete Post Modal */}
        <Modal show={isDeleteModalOpen} onHide={handleCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this post?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Confirm Delete
            </Button>
            <Button variant="secondary" onClick={handleCancelDelete}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  );
}
