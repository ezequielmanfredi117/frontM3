import axios from "axios";
import { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate




const Register = () => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({    
        name:"",
        email:"",
        nDni:"",
        allergies:"",
        birthdate:"",
        username: "",
        password:"",
        confirmPassword:""
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
        ...prevState,
        [name]: value
        }));

    
    validateField(name, value);
};

const validateField = (name, value) => {
let error = "";

switch (name) {
    case "email":
    error = !/\S+@\S+\.\S+/.test(value) ? "Email invalido" : "";
    break;
    case "nDni":
    error = !/^\d+$/.test(value) ? "DNI debe ser numerico" : "";
    break;
    case "password":
    error = value.length < 8 || !/\d/.test(value) ? "La contraseña debe contener al menos 8 caracteres y numeros" : "";
    break;
    case "confirmPassword":
    error = value !== formState.password ? "contraseña debe coincidir" : "";
    break;
    default:
    error = value === "" ? `${name} es requerido` : "";
    break;
}

setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: error
}));
};


        
    const validate = () => {
        const newErrors = {};
        
        if (!formState.name) newErrors.name = 'Campo requerido';
        if (!formState.email) newErrors.email = 'Campo requerido';
        if (!formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Formato invalido';
        if (!formState.nDni.match(/^\d+$/)) newErrors.nDni = 'Debe contener solo numeros';
        if (!formState.birthdate) newErrors.birthdate = 'Campo requerido';
        if (!formState.username) newErrors.username = 'Campo requerido';
        if (formState.password.length < 8 || !/\d/.test(formState.password)) 
        newErrors.password = 'La contraseña debe contener al menos 8 caracteres y numeros';
        if (formState.password !== formState.confirmPassword) 
        newErrors.confirmPassword = 'La contraseña no coincide';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
    
        try {
        const response = await axios.post('http://localhost:7171/users/register', formState);
          console.log('Server response:', response); // Log de la respuesta del servidor
        setStatus({ success: true });
        alert('registro exitoso!');
        setFormState({
            name: "",
            email: "",
            nDni: "",
            allergies: "",
            birthdate: "",
            username: "",
            password: "",
            confirmPassword: ""
        });

        setTimeout(() => {
            navigate("/login");
        }, 2000);
        
        } catch (error) {
        console.error('error de registro:', error); 
        setStatus({ success: false });
        alert('Registo fallo: ' + error.message);
        }
    };

    return (
        <div className={styles.mainContent}> 
        <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Registrate!</h1>
        <div className={styles.inputBox}>
            <input
            type="text"
            id="name"
            placeholder="Nombre"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className={styles.input}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div className={styles.inputBox}>
        <input
        type="email"
        id="email"
        placeholder="Correo electronico"
        name="email"
        value={formState.email}
        onChange={handleChange}
        className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.inputBox}>
            <input
            type="text"
            id="nDni"
            placeholder="Numero de documento"
            name="nDni"
            value={formState.nDni}
            onChange={handleChange}
            className={styles.input}
            />
            {errors.nDni && <p className={styles.error}>{errors.nDni}</p>}
        </div>
        <div className={styles.inputBox}>
            <input
            type="text"
            id="allergies"
            placeholder="Alergias"
            name="allergies"
            value={formState.allergies}
            onChange={handleChange}
            className={styles.input}
            />
        </div>
        <div className={styles.inputBox}>
            <input
            type="date"
            id="birthdate"
            placeholder="Fecha de nacimiento"
            name="birthdate"
            value={formState.birthdate}
            onChange={handleChange}
            className={styles.input}
            />
            {errors.birthdate && <p className={styles.error}>{errors.birthdate}</p>}
        </div>
        <div className={styles.inputBox}>
            <input
            type="text"
            id="username"
            placeholder="Nombre usuario"
            name="username"
            value={formState.username}
            onChange={handleChange}
            className={styles.input}
            />
            {errors.username && <p className={styles.error}>{errors.username}</p>}
        </div>
        <div className={styles.inputBox}>
            <input
            type="password"
            id="password"
            placeholder="Contraseña"
            name="password"
            value={formState.password}
            onChange={handleChange}
            className={styles.input}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <div className={styles.inputBox}>
            <input
            type="password"
            id="confirmPassword"
            placeholder="Confirmar Contraseña"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            />
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className={styles.button}>REGISTRAR</button>
        {status && status.success ? (
            <p className={styles.successMessage}>Registrado con exito!</p>
        ) : status && (
            <p className={styles.errorMessage}>Intente Nuevamente, el registro fallo.</p>
        )}
        </form>
        </div>
    );
};
    

export default Register;
