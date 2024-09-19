import styles from "./Jaztattoo.module.css";
import logo from "../../assets/jaztattoo.png";
import { Link } from "react-router-dom";
import image from "../../assets/360_F_34293634_cUgxYvxzMQrfG5EfYjsz9SmbnfFyR2et.jpg"

const Jaztattoo = () => {
    return (
        <section className={styles.back} style={{backgroundImage: `url(${image})`}}>
        <div className={styles.homeContainer}>
        <div className={styles.contenedorLogo}>
        <Link to="/home">
        <img src={logo} alt="Logo" className={styles.logo}/>
        </Link>
        </div>
        </div>
        </section>
    );
};

export default Jaztattoo;