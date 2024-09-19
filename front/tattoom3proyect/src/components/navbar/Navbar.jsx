import styles from "./Navbar.module.css";
import logo from "../../assets/jaztattoo.png";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";
import avatar from "../../assets/avatar.png";
import BotonLogout from "../botonLogout/BotonLogout";


const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userInfo = useSelector((state) => state.user.userInfo);
    console.log('User Info:', userInfo);

    return (
        <header className={styles.header}>
        <Link to="/home" src={logo} alt="Logo" className={styles.logo}>JazTattoo Club Art</Link>
        <nav className={styles.navbar}>
        {!isLoggedIn ? (
        <>
        <Link to="/login" className={styles.enlaces}>Iniciar Sesión</Link>
        <Link to="/registro" className={styles.enlaces}>Registrarse</Link>
        </>
        ) : (
        <>
        <Link to="/crear-turno" className={styles.enlaces}>Solicitar Turno</Link>
            <Link to="/turnos" className={styles.enlaces}>Mis Turnos</Link>
            <span className={styles.logueado}>Bienvenido, {userInfo.user.name}!</span>
            <img src={avatar} alt="Avatar" className={styles.avatar} />
            <BotonLogout />
        </>
        )}
        </nav>
    </header>
    );
    
};

export default Navbar;