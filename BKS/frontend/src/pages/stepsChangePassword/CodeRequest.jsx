// Importaciones necesarias
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Images
import BusinessLogo from "../../assets/BussinesLogo.png"

// Pages o componentes necesarios
import LoadingOverlay from "../../components/LoandingOverlay";

// CSS
import styles from '../../css/codeSteps/codeRequest.module.css';

// Alertas
import Swal from "sweetalert2";


export default function EnvioCodigo(){
    // Enviar codigo
    const [loading, setLoanding] = useState(false); 
    // Navegar
    const navigate = useNavigate();
    // correo del usuario
    const [correo, setCorreo] = useState("");

    // Conexion al controlador y al API
    const sendCode = async (e) => {
        e.preventDefault();
        setLoanding(true);

        try {
            // Llamado al API
            const res = await axios.post("http://127.0.0.1:8000/api/codeSending",{
                correo: correo 
            });

            // Codigo existente
            if(res.data.message === "Ya tienes un codigo activo. Revisa tu correo"){
                Swal.fire('Aviso', res.data.message, "warning");
            } else {
                // Guardamos el ID del usuario antes de navegar a la siguiente pagina
                localStorage.setItem("usuario_id", res.data.usuario_id);
                localStorage.setItem("correo", correo);
                // Evitamos el reinicio de tiempo
                localStorage.setItem("codigo_expira", Date.now() + 5 *60 *1000);
                // Codigo enviado
                Swal.fire('Código exitoso', 'Hemos enviado un código de verificación a tu correo', 'success');
                navigate('/confirmCode') 
            }
        } catch (error) {
            // Mustra de error - por si algo falla entre el API
            console.error('Error:', error)
            Swal.fire('Error', error.response?.data?.error || 'Error al enviar el codigo', 'error');
        } finally {
            setLoanding(false);
        }
    }

    const goBackHome = async () => {
        setLoanding(true);
        navigate("/HomePage");
    };

    // Background
        useEffect(() => {
            document.body.style.background ="linear-gradient( 135deg, #BA8C66 5%, #71380D 39%, #805332 100%, #66340F 94%)";
    
            return () => {
                document.body.style.background= "var(--color-background)"
            };
        }, []);
    

    return(
            <>
                <LoadingOverlay visible={loading} text="Enviando codigo..."/>

                {/* Form */}
                <div className={styles.backgroundLogin} id="page-fade">

                    <div className={styles.container}>
                        <div className={styles.logoContainer}>
                            <img src={BusinessLogo} alt="Logo-BKS" className={styles.imageLogo} />
                        </div>

                        <div className={styles.form}>
                            <h1>Recuperar contraseña</h1>

                            <aside className={styles.leyend}>
                                <strong>Horneando tu seguridad… </strong>Ingresa tu correo para enviarte el código de verificación.
                            </aside>

                            <form onSubmit={sendCode} className={styles.formContainer}>
                                <div className={styles.rowInputs}>
                                    <div className={styles.inputsGroup}>
                                        {/* Input email */}
                                        <input type="email" 
                                            className={styles.form_control_custom}
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                            placeholder="Correo electronico"
                                            required
                                        />
                                        <label htmlFor="">Correo <span className={styles.required}>*</span></label>
                                    </div>
                                </div>

                                <div className={styles.buttonsCode}>
                                    {/* Button sendCode */}
                                    <button type="submit" className="btn-custom" disabled={loading}>
                                        {loading ? "Enviando codigo..." : "Enviar codigo"}
                                    </button>
                                    {/* Button GoBack */}
                                    <button onClick={goBackHome}  className="btn-custom" disabled={loading}>
                                        {loading ? "Regresando" : "Regresar"}
                                    </button>
                                </div>                        
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    
}