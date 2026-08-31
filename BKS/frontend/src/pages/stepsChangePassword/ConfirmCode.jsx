// Importaciones necesarias
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Css
import styles from '../../css/codeSteps/confirmCode.module.css';

// Pages o componentes necesarios
import LoadingOverlay from "../../components/LoandingOverlay";
import Swal from "sweetalert2";

// Images
import BusinessLogo from "../../assets/BussinesLogo.png"



export default function ConfirmacionCodigo(){
    // Campo de validacion
    const [codigo, setCodigo] = useState("");
    const inputsRef = useRef([]);
    // ID del usuario
    const usuario_id = localStorage.getItem("usuario_id");
    const correo = localStorage.getItem("correo");
    // Loadings
    const [loading, setLoanding] = useState(false); 
    const [loading2, setLoanding2] = useState(false); 
    // Navegar
    const navigate = useNavigate();
    // tiempo y reenvio
    const [time, setTime] = useState(() =>{
        const expiration = localStorage.getItem("codigo_expira");

        if(!expiration){
            return 0;
        }

        const remaining = Math.floor(
            (Number(expiration) - Date.now()) / 1000
        );

        return Math.max(remaining, 0);
    });
    const [reenvio, setReenvio] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    // Configuracion OTP
    const handelCode = (e, index) => {
        const valor = e.target.value;

        // Solo permitimos numeros
        if(!/^\d*$/.test(valor)){
            return;
        }

        // Tomamos el ultimo numero escrito
        const number = valor.slice(-1);

        // Actualizar las casillas
        e.target.value = number;

        // Obtenemos los valores de 6 casillas
        const newCode = inputsRef.current
            .map((input) => input?.value || "")
            .join("");
        
        setCodigo(newCode);

        // Pasamos al siguiente input
        if ( number && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    }


    // Loading - Regreso (Inicio de sesion)
    const goBackHome = async () => {
        setLoanding(true);
        navigate("/HomePage");
    };

    // Validacion del codigo
    const verifyCode = async (e) => {
        e.preventDefault();
        setLoanding(true);

        try {
            // console.log({
            //     codigo,
            //     usuario_id
            // });
            // Llamado al API
            const res = await axios.post("http://127.0.0.1:8000/api/confirmCode",{
                // Validacion de usuario / campos
                usuario_id: Number(usuario_id),
                codigo: codigo.trim()
            });

            // Verificacion del codigo vencido
            if(res.data.message === "Codigo invalido o vencido"){
                Swal.fire('Aviso', res.data.mensaje, 'warning');
            } else {
                // Codigo correcto
                Swal.fire('Codigo exitoso', 'Codgio verificado correctamente', 'success');
                navigate('/passwordChange');
            }
        } catch (error){
            // Musetra el error
            console.error('Error', error)
            // console.log(error.response.data);
            Swal.fire('Error', error?.response?.data?.mensaje  || 'Error al verificar el codigo', 'error' ); 
        } finally{
            setLoanding(false);
        }
    }

    const resendingCode = async (e) => {
        e.preventDefault();
        setLoanding2(true);

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/codeSending",
                {correo: correo}
            );

            if(res.data.message === "Ya tienes un codigo activo. Revisa tu correo"){
                Swal.fire("Aviso", res.data.message, "warning");
                return;
            }

            // Reenvio codigo
            setTime(300);
            setReenvio(false);

            localStorage.setItem("codigo_expira", Date.now() + 5 * 60 * 1000);

            // Limpiamos el codigo que existia anteriormente
            setCodigo("");

            inputsRef.current.forEach((input) => {
                if(input) {
                    input.vale = "";
                }
            });

            // Volvemos al primer Input (OTP)
            inputsRef.current[0]?.focus();
            Swal.fire("Código enviado", "Hemos enviado un nuevo código a tu correo", "success");

        } catch (error) {
            console.error("Error", error);

            Swal.fire("Error", error.response?.data?.error || "Error al reenviar el codigo", "error");
        } finally {
            setLoanding2(false);
        }
    };

    // Contador del codigo de reenvio
    useEffect(() => {
        if(time <= 0) {
            setReenvio(true);
            return;
        }

        const interval = setInterval(() => {
            setTime((tiempoActual) => tiempoActual - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    // Background
            useEffect(() => {
                document.body.style.background ="linear-gradient( 135deg, #BA8C66 5%, #71380D 39%, #805332 100%, #66340F 94%)";
        
                return () => {
                    document.body.style.background= "var(--color-background)"
                };
            }, []);


    return(
            <> 
                <LoadingOverlay visible={loading} text="Verificando codigo..."/>
                <LoadingOverlay visible={loading2} text="Reenviando codigo..."/>

                <div className={styles.backgroundLogin} id="page-fade">
                    <div className={styles.container}>
                        <div className={styles.logoContainer}>
                            <img src={BusinessLogo} alt="Logo-BKS" className={styles.imageLogo} />
                        </div>

                        <div className={styles.form}>
                            <h1>Recuperar contraseña</h1>

                            <aside className={styles.leyend}><strong>Tu código de verificación ya salió del horno.</strong> Revisa tu correo registrado.</aside>

                            <h3>Ingresa el código de verificación</h3>

                            <form onSubmit={verifyCode} className={styles.formContainer}>
                                <div className={styles.rowsOTP}>
                                    {[0,1,2,3,4,5].map((index) => (
                                        <input
                                            key={index}
                                            ref={(element) => {
                                                inputsRef.current[index] = element;
                                            }}
                                            
                                            type="text"
                                            inputMode="numeric"
                                            maxLength="1"
                                            className={styles.OTP_input}
                                            onChange={(e) => handelCode(e, index)}
                                            required
                                        />
                                        
                                    ))}
                                </div>

                                {/* Tiempo y reenvio */}
                                <div className={styles.containerTime}>
                                    <h6>{reenvio
                                            ? "El código ha expirado"
                                            : `Timepo restante: ${formattedTime} `
                                        }
                                    </h6>

                                    {reenvio && (
                                        <button
                                            type="button"
                                            onClick={resendingCode}
                                            disabled={loading2}
                                        >
                                        {loading2 ? "Reenviando código..." : "Reenviar código"}
                                        </button>
                                    )}
                                </div>

                                <div className={styles.buttonsCode}>
                                    {/* Button sendCode */}
                                    <button type="submit" className="btn-custom" disabled={loading}>
                                        {loading ? "Validando código..." : "Validar código"}
                                    </button>
                                    {/* Button GoBack */}
                                    <button onClick={goBackHome}  className="btn-custom" disabled={loading}>
                                        {loading ? "Regresando..." : "Regresar"}
                                    </button>
                                </div> 
                            </form>
                        </div>
                    </div> 
                </div>
            </>
        )
    
}