// Importaciones necesarias
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

// Importaciones de imagenes
import Logo from "../assets/LogoEjemplo.png"

// Pages o componentes necesarios
import LoadingOverlay from "../components/LoandingOverlay";


export default function R_Contraseña1(){
    // Loadings
    const [cargaRegresar, setCargaRegresar] = useState(false);
    const [loading, setLoanding] = useState(false);

    // Visibilidad de contraseñas
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Navegar
    const navigate = useNavigate();

    // Loading (Inicio de sesion)
    const handelRegresar = async () => {
        setCargaRegresar(true);

        setTimeout(() =>{
            navigate("/login");
        }, 1500);
    }

    const handelLogin = async () => {
        setLoanding(true);

        setTimeout(() =>{
            navigate("/login");
        }, 1500)
    }



    return(
            <>
                <LoadingOverlay visible={cargaRegresar} text="Cargando..."/>
                <LoadingOverlay visible={loading} text="Cambiando contraseña..."/>
                <div className="Pagina-Principal">
                    <aside className="SubPagina">
                        <div className="Bloque_uno">
                            <h1>Recuperar Contraseña</h1>
                            <img src={Logo} alt="logo" />
                        </div>

                        <div className="Bloque_dos">
                            <form className="FormularioRegistro">
                                <h4 className="TituloFormulario">Cambia tu contraseña</h4>

                                <label htmlFor="">Contraseña nueva: </label>
                            <div className="campo-password">
                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="1234567"
                                    className="Campo"
                                    required
                                />
                                <span className="toggle" onClick={() => setShowPass(!showPass)}>
                                    <i className={showPass ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </span>
                            </div>

                            <label htmlFor="">Confirmar Contraseña nueva: </label>
                            <div className="campo-password">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="1234567"
                                    className="Campo"
                                    required
                                />
                                <span className="toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </span>
                            </div>

                                <div className="Botones">
                                    <button type="submit" className="btn-custom BTN " onClick={handelLogin} disabled={loading}>{loading ? "Cambiando contraseña..." : "Cambiar contraseña"}</button>
                                    <button type="button" className="BTN" onClick={handelRegresar} disabled={cargaRegresar}>{cargaRegresar ? "Regresando..." : "Regresar"}</button>
                                </div>
                            </form>
                        </div>
                    </aside>
                </div>
            </>
        )
    
}