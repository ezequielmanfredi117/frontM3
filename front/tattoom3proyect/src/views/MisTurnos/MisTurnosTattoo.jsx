
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAppointments, updateAppointmentStatus } from '../../Redux/Reducer/appointmentSlice.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Turno from "../../components/turno/Turno";
import styles from "./MisTurnosTattoo.module.css"
import image from "../../assets/tattoodark.jpg"

const MisTurnos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const appointments = useSelector((state) => state.appointments.userAppointments);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      const fetchAppointments = async () => {
        try {
          const response = await axios.get(`http://localhost:7171/appointments/user/${user.user.id}`);
          dispatch(setAppointments(response.data));
        } catch (error) {
          console.error('Error al traer los turnos');
        }
      };

      fetchAppointments();
    }
  }, [user, navigate, dispatch]);

  if (!user) {
    return null;
  }

  const handleCancelAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:7171/appointments/${id}/cancel`);
      dispatch(updateAppointmentStatus({ id, status: "cancelled"}));
    } catch (error) {
      console.error('Error al cancelar turno', error);
    }
  };

  return (
    <section className={styles.back} style={{backgroundImage: `url(${image})`}}>
    <div className={styles.mainContent}>
      <h2>Mis Turnos</h2>
      {appointments.length > 0 ? (
        <div>
          {appointments.map((appointment) => (
            <Turno
              key={appointment.id}
              date={appointment.date}
              time={appointment.time}
              userId={appointment.userId}
              status={appointment.status}
              onCancel={() => handleCancelAppointment(appointment.id)}
            />
          ))}
        </div>
      ) : (
        <p>No hay turnos agendados</p>
      )}
    </div>
    </section>
  );
};

export default MisTurnos;