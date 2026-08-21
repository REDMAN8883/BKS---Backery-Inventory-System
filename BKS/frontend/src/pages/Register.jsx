// Importaciones necesarias
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";

// Pages o componentes necesarios
import LoadingOverlay from "../components/LoandingOverlay";

// Images
import BusinessLogo from "../assets/BussinesLogo.png"

// css
import styles from '../css/Register.module.css';

// Alertas
import Swal from "sweetalert2";

export default function Registro(){

// Crear cuenta
// const [isSubmitting, setIsSubmitting] = useState(false); 
const [loading, setLoanding] = useState(false);
const [country, setCountry] = useState("CO");

const [documents, setDocuments] = useState([]);
// const _prefix = `+${getCountryCallingCode(country)}`;

// Loadings
// const [cargaRegresar, setCargaRegresar] = useState(false);
// const [cargaLogin, setCargaLogin] = useState(false);

// Navegacion
const navigate = useNavigate();

// // Visibilidad de las contraseña
const [showPass, setShowPass] = useState(false);
const [ showCountries, setShowCountries] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// // Alfanumerico para contraseñas
const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;

// // Peticiones del formulario
const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    id_Document: '',
    numero_Documento: '',
    prefijo: '+57',
    numero_Celular: '',
    contrasena: '',
    contrasenaConfirmacion: '',
    correo_Personal: '',
    acepta_terminos: false,
    confirma_mayoria_edad: false
});

const formRegister = (e) =>{
    const {name, value} = e.target;
    setFormData(prev =>({ ...prev, [name]: value}));
}

// Validacion de los campos
const registerUser = async (e) => {
    e.preventDefault();

    const {
        nombres,
        apellidos,
        id_Document,
        numero_Documento,
        numero_Celular,
        contrasena,
        contrasenaConfirmacion,
        correo_Personal,
        acepta_terminos,
        confirma_mayoria_edad,
    } = formData;

    // Validamos si los campos estan vacios o no
    if (!nombres || !apellidos || !id_Document || !numero_Documento || !numero_Celular || !correo_Personal  || !contrasena || !contrasenaConfirmacion){
        Swal.fire('Campos requeridos', 'Completa todos los campos', 'warning');
        return;
    }

    if (!acepta_terminos || !confirma_mayoria_edad){
        Swal.fire('Confirmación requerida', 'Debes acpetar los términos y condiciones y confirmar tu mayoría de edad', 'warning')
        setLoanding(false);
        return;
    }

    // Regex contraseña alfanumerica 
    if (!regex.test(contrasena)) {
        Swal.fire (
            'Contraseña insegura',
            'La contraseña debe contener numeros y por lo menos un simbolo',
            'warning'
        );
        return;
    }

    // Confirmacion de contraseñas 
    if (contrasena !== contrasenaConfirmacion) {
        Swal.fire('Error', 'Las contraseñas no coinciden', 'warning');
        return;
    }

    // Loading
    setLoanding(true);

    // Creacion del usuario
    try {

        
        const res = await axios.post("http://127.0.0.1:8000/api/usuarios", formData);

        // console.log(res.data);

        if(res?.data?.data?.id){
            localStorage.setItem("usuario_id", res.data.data.id);
        }

        Swal.fire('Registro exitoso', 'Cuenta creada con exito, inicia sesión ahora', 'success');
        navigate('/login')

    } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', error.response?.data?.error || error.response?.data?.message || 'Error al crear la cuenta', 'error');
    } finally {
        setLoanding(false)
    }
}

// SIN REQUERIR AUN

//     const handleCancelar = () => {
//     Swal.fire({
//       title: 'Cancelado',
//       text: 'Registro cancelado.',
//       icon: 'info',
//       timer: 1200,
//       showConfirmButton: false
//     });
//     setTimeout(() => navigate('/admin/usuarios'), 1200);
//   };

// Loading por si se tiene cuenta
// const handelLogin = async () => {
//     setCargaLogin(true);

//     setTimeout(() =>{
//         navigate("/login");
//     }, 1500);
// }

// Loading para regresar
// const handelRegresar = async () => {
//     setCargaRegresar(true);

//     setTimeout(() =>{
//         navigate("/");
//     }, 1500);
// };

// Background
useEffect(() => {
    document.body.style.background ="linear-gradient( 135deg, #BA8C66 5%, #71380D 39%, #805332 100%, #66340F 94%)";

    return () => {
        document.body.style.background= "var(--color-background)"
    };
}, []);

// Llamado de los documentos para el mapeo
useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/documents")
        .then((res) => {
            setDocuments(res.data);
        })
        .catch((err) => console.error(err));
}, []);

// Visualizacion de las banderas
// const getFlagEmoji = (countryCode) => {
//     return countryCode
//         .toUpperCase()
//         .replace(/./g, char =>
//             String.fromCodePoint(127397 + char.charCodeAt())
//         );
// }

return(
    <>
        <LoadingOverlay visible={loading} text="Creando cuenta..."/>

        <div className={styles.backgroundRegister} id="page-fade">

            <div className={styles.container}>

                <div className={styles.logoContainer}>
                    <img src={BusinessLogo} alt="" className={styles.imageRegister} />
                </div>

                <div className={styles.form}>

                    <h1>Comienza ahora</h1>

                    <aside className={styles.leyend}>
                        <strong>"Danos los ingredientes que faltan."</strong><br /><br />
                        Así como un buen pan lleva su tiempo, tu registro casi está en su punto. Completa tus datos y ¡listo!
                    </aside>

                    <form action="" onSubmit={registerUser}>

                        <div className={styles.rowInputs}>

                            <div className={styles.inputsGroup}>
                                {/* Name */}
                                <input 
                                    type="text" 
                                    name="nombres"
                                    value={formData.nombres}
                                    className={styles.form_control_custom}
                                    onChange={formRegister}
                                    placeholder="Ej. Juan"
                                    required 
                                />
                                <label htmlFor="">Nombres <span className={styles.required}>*</span></label>
                            </div>

                            <div className={styles.inputsGroup}>
                                {/* LastName */}
                                <input 
                                    type="text"
                                    name="apellidos"
                                    value={formData.apellidos}
                                    className={styles.form_control_custom}
                                    onChange={formRegister}
                                    placeholder="Ej. Perez Gomez"
                                    required
                                />
                                <label htmlFor="">Apellidos <span className={styles.required}>*</span></label>
                            </div>
                            
                            <div className={styles.rowsPrefix}>

                                <div className={styles.inputsGroup}>
                                    {/* Prefix */}
                                    <button 
                                        type="button"
                                        className={styles.prefix}
                                        onClick={() => setShowCountries(!showCountries)}
                                    >
                                        {/* <span>{getFlagEmoji(country)}</span> */}
                                        {flags[country] && (() =>{
                                            const Flag = flags[country];

                                            return <Flag className={styles.flags} />
                                        })()}

                                        {/* <span>+{getCountryCallingCode(country)}</span> */}
                                        {/* <span>▼</span> */}
                                    </button>

                                    {showCountries && (
                                        <div className={styles.countriesList}>
                                            {getCountries().map((c) =>(
                                                <button
                                                    type="button"
                                                    key={c}
                                                    onClick={() => {
                                                        setCountry(c);

                                                        setFormData(prev => ({
                                                            ...prev,
                                                            prefijo: `+${getCountryCallingCode(c)}`
                                                        }));
                                                        setShowCountries(false);
                                                    }}
                                                >
                                                    {flags[c] && (() => {
                                                        const Flag = flags[c];

                                                        return <Flag className={styles.flags} />
                                                    }) ()}
                                                    {/* <span>+{getCountryCallingCode}</span> */}
                                                </button>
                                            ))}

                                        </div>
                                    )}

                                    <label>
                                        Prefijo
                                    </label>
                                </div>

                                {/* Number Phone */}
                                <div className={styles.inputsGroup}>
                                    <input
                                        type="number"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        value={formData.numero_Celular}
                                        onChange={(e) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                numero_Celular: e.target.value
                                            }));
                                        }}
                                        className={styles.form_control_custom}
                                        placeholder="Ej. 300 123 4567"
                                        required
                                    />

                                    <label>
                                        Número celular <span className={styles.required}>*</span>
                                    </label>
                                </div>

                            </div>

                            <div className={styles.inputsGroup}>
                                {/* Type Document */}
                                <select 
                                    name="id_Document"
                                    value={formData.id_Document}
                                    onChange={formRegister}
                                    className={styles.document}
                                    required
                                >
                                    <option value="">Selecciones un documento</option>

                                    {documents.map((type) =>(
                                        <option key={type.id} value={type.id}>
                                            {type.abreviatura} - {type.nombre}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="">Tipo de documento <span className={styles.required}>*</span></label>
                            </div>

                            <div className={styles.inputsGroup}>
                                {/* Number document */}
                                <input 
                                    type="number"
                                    name="numero_Documento"
                                    value={formData.numero_Documento}
                                    onWheel={(e) => e.currentTarget.blur()}
                                    pattern="[0-9]*"
                                    onChange={formRegister}
                                    placeholder="Ej. 123456789"
                                    required
                                />
                                <label htmlFor="">Numero de documento <span className={styles.required}>*</span></label>
                            </div>

                            <div className={styles.inputsGroup}>
                                {/* Input Email */}
                                <input 
                                    type="email"
                                    name="correo_Personal"
                                    value={formData.correo_Personal}
                                    className={styles.form_control_custom}
                                    placeholder="Introduce tu correo electrónico"
                                    onChange={formRegister}
                                    required
                                />
                                <label htmlFor="">Correo <span className={styles.required}>*</span></label>
                            </div>

                            <div className={styles.inputsGroup}>
                                {/* Input Password */}
                                <input 
                                    type={showPass ? "text" : "password"}
                                    name="contrasena"
                                    value={formData.contrasena}
                                    className={styles.form_control_custom}
                                    placeholder="Introduce tu contraseña"
                                    onChange={formRegister}
                                    required
                                />
                                <label htmlFor="">Contraseña <span className={styles.required}>*</span></label>
                                <span className={styles.toggle} onClick={() => setShowPass(!showPass)}>
                                    <i className={showPass ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </span>
                            </div>

                            <div className={styles.inputsGroup}>
                                {/* Confirmation Password */}
                                <input 
                                    type={showPass ? "text" : "password"}
                                    name="contrasenaConfirmacion"
                                    value={formData.contrasenaConfirmacion}
                                    className={styles.form_control_custom}
                                    placeholder="Repite tu contraseña"
                                    onChange={formRegister}
                                    required
                                />
                                <label htmlFor="">Confirmacion de contraseña <span className={styles.required}>*</span></label>
                                <span className={styles.toggle} onClick={() => setShowPass(!showPass)}>
                                    <i className={showPass ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </span>
                            </div>

                        </div>

                        <div className={styles.helps}>

                            {/* checkbox */}
                            <div className={styles.checkbox}>
                                <input 
                                    type="checkbox"
                                    checked={formData.acepta_terminos}
                                    onChange={(e) => {
                                        setFormData(prev =>({
                                            ...prev,
                                            acepta_terminos: e.target.checked
                                        }));
                                    }}
                                    />
                                <label>He leído y acepto los <strong><a className={styles.conditions}>Términos y Condiciones</a></strong>, así como la Política de Privacidad y el tratamiento de mis datos personales</label>
                            </div>

                            {/* checkbox */}
                            <div className={styles.checkbox}>
                                <input 
                                    type="checkbox" 
                                    checked={formData.confirma_mayoria_edad}
                                    onChange={(e) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            confirma_mayoria_edad: e.target.checked
                                        }));
                                    }}
                                    />
                                <label>Al registrarte, confirmas que tienes al menos 18 años o que cuentas con la autorización de tus padres o tutores para realizar compras en este sitio</label>
                            </div>

                        </div>

                        <div className={styles.buttonsRegister}>

                            {/* Button LogIn */}
                            <button type="submit" className="btn-custom" disabled={loading}>
                                {loading ? "Validando" : "Crear cuenta"}
                            </button>

                        </div>

                        {/* Buttons Social Medias */}
                        <div className={styles.socialMedialContainer}>

                            {/* Google */}
                            <button type="button" className={styles.socialButton} onClick={() => window.location.href = "http://localhost:8000/auth/google"}>
                                <i className="bi bi-google"></i> 
                            </button>

                        </div>

                        <Link to="/login" className={styles.accountNew}>
                            ¿Ya tienes una cuenta? <span className={styles.underlined}>Inicia sesión</span>
                        </Link>

                    </form>

                </div>

            </div>

        </div>
    </>
)

}