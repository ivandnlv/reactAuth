import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: null,
      email: null,
      token: null,
    },
  },
  reducers: {
    addUserToLocal(state) {
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    addNewUser(state, action) {
      state.user.email = action.payload.email;
      state.user.id = action.payload.id;
      state.user.token = action.payload.token;
    },
    clearUser(state) {
      state.user.id = null;
      state.user.email = null;
      state.user.token = null;
      localStorage.removeItem('user');
    },
  },
});

export const { clearUser, addNewUser, addUserToLocal } = userSlice.actions;
export default userSlice.reducer;
