// Importaciones necesarias
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Importaciones de imagenes
import BusinessLogo from "../../assets/BussinesLogo.png"

// Pages o componentes necesarios
import LoadingOverlay from "../../components/LoandingOverlay";
import Swal from "sweetalert2";

// Css
import styles from  '../../css/codeSteps/passwordChange.module.css';


export default function CambioContraseña(){
    // Loadings
    const [loading, setLoanding] = useState(false);
    // Visibilidad de contraseñas
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // Inputs de cambio de contraseña
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const usuario_id = localStorage.getItem("usuario_id");
    // Navegar
    const navigate = useNavigate();


    // Llamado al API
    const changePassword = async (e) => {
        e.preventDefault();
        

        // Peticion de cambios
        try{
            if(!newPassword || !confirmPassword){
                Swal.fire("Advertencia", "Todos los campos son obligatorios", "warning");
                return;
            }
            // Peticion de los digitos
            if(newPassword.length < 8){
                Swal.fire("Advertencia", "La nueva contraseña debe tener por lo menos 8 caracteres", "warning")
                return;
            }
            // Peticion de igualdad
            if(newPassword !== confirmPassword){
                Swal.fire("Advertencia", "Las contraseñas no coinciden", "warning")
                return; // Detiene el progreso por si no se cumple con lo requerido
            }
            // Alerta de contraseña nueva
            const confirm = await Swal.fire({
                title: "¿Cambiar contraseña?",
                text: "Tu contraseña sera cambiada",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, cambiar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#2fa779",
                cancelButtonColor: "#2fa779"
            });
            // Guardar contraseña en BD
            if(!confirm.isConfirmed) return;

            setLoanding(true);

            await axios.put("http://127.0.0.1:8000/api/passwordChange", {
                usuario_id,
                newPassword,
                confirmPassword,
            });

            Swal.fire("Exito", "La contraseña se ha cambiado correctamente", "success");
            
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => navigate('/login'));
        } catch (error){
            console.error(error);
            Swal.fire("Error", error.response?.data?.message || "No se pudo cambiar la contraseña", "Error");
        } finally{
            setLoanding(false);
        }
        
    }

    // Loading - Regreso (Inicio de sesion)
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
                <LoadingOverlay visible={loading} text="Guardando la contraseña nueva..."/>

                <div className={styles.backgroundLogin}>
                    <div className={styles.container}>
                        <div className={styles.logoContainer}>
                            <img src={BusinessLogo} alt="BKS-Logo" className={styles.imageLogo} />
                        </div>

                        <div className={styles.form}>
                            <h1>Recuperar contraseña</h1>

                            <aside className={styles.leyend}>Tu cuenta es como nuestra receta: <strong>única y privada.</strong> Cambia tu contraseña para que solo tú tengas la llave de tus pedidos.</aside>

                            <form onSubmit={changePassword} className={styles.formContainer}>
                                <div className={styles.inputsGroup}>
                                    {/* Input New Password */}
                                    <input type={showPass ? "text" : "password"}
                                        className={styles.form_control_custom}
                                        placeholder="Introduce tu nueva contraseña"
                                        minLength={8}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="">Contraseña <span className={styles.required}>*</span></label>
                                    <span className={styles.toggle} onClick={() => setShowPass(!showPass)}>
                                        <i className={showPass ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                    </span>
                                </div>

                                <div className={styles.inputsGroup}>
                                    {/* Input Confirm New Password */}
                                    <input type={showConfirmPassword ? "text" : "password"}
                                        className={styles.form_control_custom}
                                        placeholder="Confirma tu contraseña"
                                        minLength={8}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="">Confirmar contraseña <span className={styles.required}>*</span></label>
                                    <span className={styles.toggle} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                    </span>
                                </div>

                                <div className={styles.buttonsCode}>
                                {/* Button LogIn */}
                                    <button type="submit" className="btn-custom" disabled={loading}>
                                        {loading ? "Cambiando contraseña" : "Cambiar contraseña"}
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