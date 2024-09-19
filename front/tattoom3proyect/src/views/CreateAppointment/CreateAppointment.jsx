import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addAppointment } from '../../Redux/Reducer/appointmentSlice.js';
import styles from './CreateAppointment.module.css';
import { useNavigate } from 'react-router-dom';
import image from "../../assets/tattoodark.jpg"

const CreateAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const [formData, setFormData] = useState({ date: '', time: '' });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateAppointment = (date, time) => {
    const appointmentDate = new Date(date + ' ' + time);
    const dayOfWeek = appointmentDate.getDay();
    const hour = appointmentDate.getHours();
    const minutes = appointmentDate.getMinutes();

    // Check if the day is between Monday (1) and Friday (5)
    if (dayOfWeek < 1 || dayOfWeek > 5) {
      return 'Los turnos deben ser de lunes a viernes.';
    }

    // Check if the time is between 8:00 AM and 5:00 PM
    if (hour < 8 || (hour >= 17 && minutes > 0)) {
      return 'Los turnos deben ser entre las 8:00 AM y las 5:00 PM.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    console.log(user.user.id);

    const errorMessage = validateAppointment(formData.date, formData.time);
    if (errorMessage) {
      setMessage(errorMessage);
      setIsSubmitting(false);
      return;
    }


    try {
      const response = await axios.post('http://localhost:7171/appointments/schedule', {
        ...formData,
        userId: user.user.id,
      });
      dispatch(addAppointment(response.data));
      setMessage('Turno creado correctamente!');

      setTimeout(() => {
        navigate("/home");
      }, 3000);

    } catch (error) {
      setMessage('Error al crear turno. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.date && formData.time;

  return (
    <section className={styles.back} style={{backgroundImage: `url(${image})`}}>
    <div className={styles.mainContent}>
      <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Solicitar Turno</h1>
        <div className={styles.inputBox}>
          <input
            type="date"
            name="date"
            placeholder='Fecha'
            value={formData.date}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputBox}>
          <input
            type="time"
            name="time"
            placeholder='Horario'
            value={formData.time}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" disabled={!isFormValid || isSubmitting} className={styles.button}>
          Solicitar Turno
        </button>
      {message && <p className={styles.errorMessage}>{message}</p>}
      </form>
    </div>
    </section>
  );
};

export default CreateAppointment;
