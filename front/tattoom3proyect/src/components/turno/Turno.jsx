import styles from "./Turno.module.css";

const Turno = ({date, time, userId, status, onCancel}) => {
    return (
        <div className={styles.turnoContainer}>
        
        <h3>Fecha:{date}</h3>
        <h3>Hora:{time}</h3>
        <h3 className={`${styles.status} ${styles[status]}`}>{status.toUpperCase()}</h3>
        <button className={styles.button} disabled={status === "cancelled"}
        onClick={onCancel}
        >Cancelar Turno</button>
        </div>
    );
};

export default Turno;