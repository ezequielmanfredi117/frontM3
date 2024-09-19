import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    isLoggedIn: false,
  },
  reducers: {
    loginSuccess(state, action) {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;


