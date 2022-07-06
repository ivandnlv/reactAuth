import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './slices/registerSlice';

export const store = configureStore({
  reducer: {
    register: registerSlice,
  },
});
