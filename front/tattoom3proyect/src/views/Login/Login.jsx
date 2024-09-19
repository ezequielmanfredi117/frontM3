import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginSuccess } from '../../Redux/Reducer/userSlice.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:7171/users/login', formData);
      dispatch(loginSuccess(response.data)); // Guarda la información del usuario en el store
      console.log(response.data); // Verifica la estructura de los datos recibidos

      setMessage('Bienvenido!');
      setMessageType('success');

      setTimeout(() => {
        navigate("/home");
      }, 2000); 

    } catch (error) {
      setMessage('Logueo sin exito. Intente nuevamente.');
      setMessageType('error'); // Define el tipo de mensaje    } finally {
      setIsSubmitting(false);
    }
  };

  const [messageType, setMessageType] = useState(''); // Nuevo estado para el tipo de mensaje

  const isFormValid = formData.username && formData.password;

  return (
    <div className={styles.mainContent}>
      <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Inicia Sesión</h1>
      <div className={styles.inputBox}>
          <input
            type="username"
            name="username"
            placeholder="Nombre usuario"
            value={formData.username}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <FaUser className={styles.icon}/>
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <FaLock  className={styles.icon}/>
        </div>
        <button type="submit" disabled={!isFormValid || isSubmitting} className={styles.button}>
          Login
        </button>
        <p className={styles.registerPrompt}>
                    ¿Aún no te registraste? <Link to="/registro" className={styles.registerLink}>Regístrate aquí</Link>
                </p>
                {message && (
          <p className={messageType === 'success' ? styles.successMessage : styles.errorMessage}>
            {message}
          </p>
        )}      </form>
    </div>
  );
};

export default Login;
