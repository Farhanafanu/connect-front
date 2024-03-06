import React, { useState } from "react";
import "./addpost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../Redux/Slice/postSlice";

export default function AddPost({ onNewPost }) {
  const [content, setContent] = useState("");
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [contentError, setContentError] = useState("");
  const dispatch = useDispatch();
  const CurrentUserData = useSelector((state) => state.auth.user);
  const userId = CurrentUserData?.user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if content is empty
    if (content.trim() === "") {
      setContentError("Content cannot be blank");
      return; // Prevent form submission
    }

    // Reset content error
    setContentError("");

    const formData = new FormData();
    formData.append("content", content);

    videos.forEach((video, index) => {
      formData.append(`videos[${index}]`, video);
    });
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      formData.append("user", userId);
      const response = await axios.post(`${BASE_URL}/addpost/${userId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      onNewPost(response.data);
      setContent("");
      setVideos([]);
      setImages([]);
      dispatch(addPost({ userId, post: response.data }));
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleVideoChange = (e) => {
    setVideos(Array.from(e.target.files));
  };

  return (
    <>
      <form className="postForm" onSubmit={handleSubmit}>
        <div className="user form-top">
          {CurrentUserData &&
            CurrentUserData.user_profile &&
            CurrentUserData.user_profile.profile_image && (
              <img
                src={`${BASE_URL}${CurrentUserData.user_profile.profile_image}`}
                alt=""
              />
            )}
          <input
            type="text"
            placeholder="What's on your mind"
            value={content}
            onChange={handleContentChange}
          />
          <button type="submit" className="btn" style={{ backgroundColor: '#8A2BE2', color: '#FFFFFF' }}>
            Post
          </button>
        </div>
        <div className="post-categories">
          <label htmlFor="images">
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
            />
            <span>
              <FontAwesomeIcon icon={faImage} style={{color:'blueviolet'}} />
              Photos
            </span>
          </label>
          <label htmlFor="videos">
            <input
              type="file"
              id="videos"
              multiple
              onChange={handleVideoChange}
            />

            <span>
              <FontAwesomeIcon icon={faVideo} style={{color:'blueviolet'}} />
              Videos
            </span>
          </label>
        </div>
        <div className="error-message">{contentError}</div>
      </form>
    </>
  );
}
