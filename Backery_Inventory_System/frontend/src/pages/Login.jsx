import { useState } from "react"
// import { useNavigate } from "react-router-dom";

// Css
import '../css/Login.css';

// Pages o components necesarios
import { useAuth } from "../context/useAuth";
import ToastNotification from "../components/ToastNotification";

//import de alerta y axios
import axios from "axios";
//import Swal from "sweetalert2";

export default function Login() {
    //Campos de validacion
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Visualizar contraseña
    const [showPass, setShowPass] = useState(false);
    // Carga de los campos
    const [loading, setLoanding] = useState(false);
    // auth
    const { login } = useAuth();
    //Navegador de paginas
    // const navigate = useNavigate();
 
    // Estado de la alerta del inicio de sesion
    const [toast, setToast] = useState({
        isVisible: false,
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {
        setToast({
            isVisible: true,
            message,
            type,
        });
    };

    const hideToast = () => {
        setToast((prev) => ({
            ...prev,
            isVisible: false,
        }));
    };

    // Conexion a la los controladores y apis
    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoanding(true);

        try {
            const res = await axios.post("", {
                correo: email,
                contrasena: password,
            });

            const { token, usuario } = res.data;

            login(usuario);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(usuario));

            showToast("Inicio de sesión exitoso", "success");

            // const userRole = usuario.rol?.toLowerCase().trim();

            // setTimeout(() => {
            //     if (userRole && ["Admin", "cliente"].includes(userRole)){
            //         navigate(`/${routeRole}`); // Hacer ruta y controlador del rol
            //     } else {
            //         showToast(`Rol de usuario no valido: "${userRole}"`, "error");
            //     }
            // }, 1000);
        } catch (err){
            console.error(err);
            showToast(err.response?.data?.mensaje || "Error en el servidor", "error");
        } finally {
            setLoanding(false);
        }
    };


    return (
        <>
            <div className="login-page">
                <div className="bg-shapes">
                    <div className="shape"></div>
                    <div className="shape"></div>
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>

                {/* Notificacion */}
                <ToastNotification 
                    message={toast.message}
                    type={toast.type}
                    isVisible={toast.isVisible}
                    onClose={hideToast}
                />

                <div className="container-fluid">
                        <h1 className="title text-center mb-3">Inicio de sesión</h1>
                    <div className="form-container">
                        <div className="login-icon">
                            <i className="bi bi-person-fill"></i>
                        </div>
                        <p className="text-muted text-center mb-4">Bienvenido a BKS</p>

                        <form onSubmit={handelSubmit}>
                            {/* Correo electronico */}
                            <div className="input-group-custom">
                                <span className="input-icon">
                                    <i className="bi bi-envelope-fill"></i>
                                </span>
                                <input type="email"
                                    className="form-control-custom"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            {/* Contraseña */}
                            <div className="input-group-custom position-relative">
                                <span className="input-icon">
                                    <i className="bi bi-lock-fill"></i>
                                </span>
                                <input type={showPass ? "text" : "password"}
                                className="form-control-custom"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                                <span 
                                className="toogle-password"
                                onClick={() => setShowPass(!showPass)}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                }}>
                                    <i className={showPass ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </span>
                            </div>
                            {/* Boton */}
                            <button type="submit" className="btn-custom w-100" disabled={loading}>{loading ? "Validando..." : "Iniciar Sesión"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )




}