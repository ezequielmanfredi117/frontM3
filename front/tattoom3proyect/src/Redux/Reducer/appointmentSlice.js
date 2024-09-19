import { createSlice } from '@reduxjs/toolkit';

const initialState= {
  userAppointments: [],
};

  const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
  reducers: {
    setAppointments(state, action) {
      state.userAppointments = action.payload;
    },
    addAppointment(state, action) {
      state.userAppointments.push(action.payload);
    },
    removeAppointment(state, action) {
      state.userAppointments = state.userAppointments.filter(app => app.id !== action.payload);
    },
    updateAppointmentStatus(state, action) {
      const { id, status } = action.payload;
      const appointment = state.userAppointments.find(app => app.id === id);
      if (appointment) {
        appointment.status = status;
      }
    },
  },
});

export const { setAppointments, addAppointment, updateAppointmentStatus, removeAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;