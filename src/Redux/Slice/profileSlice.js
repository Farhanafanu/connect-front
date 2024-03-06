
import { createSlice } from '@reduxjs/toolkit';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userProfile: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUserProfile } = userProfileSlice.actions;
export const selectUserProfile = (state) => state.userProfile.userProfile;//takes the entire Redux state object as an argument and returns the userProfile property from the userProfile slice of the state

export default userProfileSlice.reducer;
