
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Redux/Reducer/userSlice';
import appointmentsReducer from '../Redux/Reducer/appointmentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    appointments: appointmentsReducer,
  },
});