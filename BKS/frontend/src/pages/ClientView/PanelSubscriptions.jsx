// Importaciones necesarias
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

//import de axios
import axios from "axios";

// Import components
import NavBar from '../../components/NavBar'

// CSS
import styles from "../../css/clientCss/panelSubscriptions.module.css";

export default function PanelSubscription () {

    const [membership, setMembership] = useState([]);
    const [selectedMembership, setSelectedMembership] = useState(null);

    const getMembershipClass = (nombre) => {
        return nombre
            .replace("Plan", "")
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    useEffect (() => {
        const obtainMemberships = async () => {
            try {
                const token = 
                    localStorage.getItem("token") ||
                    sessionStorage.getItem("token");
                // console.log("TOKEN:", token);

                const response = await axios.get("http://127.0.0.1:8000/api/membresias", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                // console.log(response.data);
                setMembership(response.data);

            } catch (error) {
                console.error("Error obtenido membresias", error)
            }
        };
        obtainMemberships();
    }, []);

    // Variables necesarias 
        // const [loading, setLoading] = useState(false);
        // const navigate = useNavigate();

        
    return (
        <>
            <div>
                <NavBar/>

                <header >
                    <h1>El secreto de la panadería <strong className={styles.boldType}>maestra</strong></h1>
                    <h3>Tu nueva <strong className={styles.boldType}>suscripción</strong></h3>
                </header>

                <div className={styles.containerMembership}>
                    {/* <h1>membresias</h1> */}

                    {membership.map((membresia) =>(
                        <div key={membresia.id}
                            className={`${styles.membershipCard} 
                                ${styles[getMembershipClass(membresia.nombre)]}`}
                        >
                            <h2>{membresia.nombre}</h2>
                            <p className={styles.membershipDescription}>{membresia.descripcion}</p>
                            <p className={styles.membershipDays}>{membresia.duracion_dias} dias</p>
                            <div className={styles.membershipBenefits}>
                                {membresia.beneficios.map((beneficio, index) => (
                                    <p key={index}>
                                        • {beneficio}
                                    </p>
                                ))}
                            </div>
                            <p className={styles.membershipPrice}>${membresia.precio}</p>

                            <button 
                                className={styles.buyButton}
                                onClick={() => setSelectedMembership(membresia)}
                            >
                                {selectedMembership?.id === membresia.id
                                    ? "Plan seleccionado"
                                    : getMembershipClass(membresia.nombre) === "basico"
                                        ? "Plan activo (Gratis)"
                                        : getMembershipClass(membresia.nombre) === "gourmet"
                                            ? "Suscribirse (Intermedio)"
                                            : getMembershipClass(membresia.nombre) === "maestro"
                                                ? "Suscribirse (Premium) "
                                                : "Comprar"
                                }
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}