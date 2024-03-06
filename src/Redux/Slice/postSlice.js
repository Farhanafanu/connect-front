import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
 name: "post",
 initialState: {}, 
 reducers: {
    addPost: (state, action) => {
      const { userId, post } = action.payload;
      if (!state[userId]) {
        state[userId] = []; //It checks if there is an array of posts (state[userId]) for the specified user ID. If not, it initializes an empty array for that user ID.
      }
      state[userId].push(post);//It then pushes the new post into the array of posts for the specified user.
    },
    editPost: (state, action) => {
      const { userId, post } = action.payload;
      if (state[userId]) {
        const index = state[userId].findIndex((p) => p.id === post.id); //find index of post
        if (index !== -1) {//after finding post editing
          state[userId][index] = post; 
        }
      }
    },
    deletePost: (state, action) => {
      const { userId, postId } = action.payload;
      if (state[userId]) {
        state[userId] = state[userId].filter((post) => post.id !== postId);//filter other post than deleteed post
      }
    },
    updatePost: (state, action) => {
      const { userId, postId, updatedPost } = action.payload;
      if (state[userId]) {
        const index = state[userId].findIndex((p) => p.id === postId);
        if (index !== -1) {
          state[userId][index] = { ...state[userId][index], ...updatedPost };//existst reming post
        }
      }
    },
 },
});

export const { addPost, deletePost,editPost,updatePost } = postSlice.actions;
export default postSlice.reducer;
