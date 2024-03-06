/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserProfile from "../Userprofile/UserProfile";
import AddPost from "../Addpost/AddPost";
import Feeds from "../Feeds/Feeds";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Api/api";

export default function Profile() {
  const token = useSelector((state) => state.auth.token);
  const [feeds,setFeeds] = useState([])
  const navigate = useNavigate();
  const userId = useSelector((state)=>state.auth.user?.user?.id)
  console.log("USER:",userId)


  const updateFeed = useCallback((newPost) => {
    console.log('Before update:', feeds);
    setFeeds((currentFeeds) => {
      const updatedPost = { ...newPost, };//add post and remain initial post
      const updatedFeeds = [updatedPost, ...currentFeeds];//updated post first
      console.log('After update:', updatedFeeds);
      return updatedFeeds;//return updated feed
    });
  }, [feeds]); 
  
  
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      
      const fetchInitialPosts = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/posts/${userId}/`);
          if (response.data) {
            setFeeds(response.data);//Upon receiving a response, it updates the feeds state with the data retrieved from the server using setFeeds.
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchInitialPosts();// is included inside the useEffect hook to trigger the initial fetching of posts when the component mounts and to handle subsequent updates based on changes in the specified dependencies.
    }
  }, [token, navigate, userId]);

  const removePostFromFeed = useCallback((deletedPostId) => {
    setFeeds((currentFeeds) => currentFeeds.filter(post => post.id !== deletedPostId));//filter post other deleted
  }, []);
 

  const editPost = useCallback((updatedPost)=>{
    setFeeds((currentFeeds) =>
      currentFeeds.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      ))
  },[])//replaces exiting post with edited post
  

  return ( 
    <>
      <UserProfile />
      <AddPost onNewPost={updateFeed}/>
      <Feeds feeds = {feeds} onRemovePost={removePostFromFeed} onEditPost={editPost}/>
    </>
  );
}
