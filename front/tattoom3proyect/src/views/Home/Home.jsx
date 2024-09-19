import styles from './Home.module.css';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className={styles['home-container']}>
            <div className={styles['content']}>
            <h2>Bienvenido a JazTattoo</h2>
                <h3>La mejor experiencia en tatuajes</h3>
                <h1>Solicita tu turno!</h1>
                <h3>Inicia sesión para poder pedir tu turno!</h3>
                <p><Link to="/login" className={styles['loginLink']}>Iniciar Sesión</Link></p>
                <p className={styles.registerPrompt}>
                    ¿Aún no te registraste? <Link to="/registro" className={styles.registerLink}>Regístrate aquí</Link>
                </p>
            </div>
            <div className={styles['image-container']}></div>
        </div>
    );
};

export default Home;
