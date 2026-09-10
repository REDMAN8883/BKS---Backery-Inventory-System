// Importaciones necesarias
import { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { useAuth } from '../../context/useAuth';
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";

// Import components
import NavBar from '../../components/NavBar'
import { profileFields } from '../../components/FormFields';

// Css
import styles from "../../css/clientCss/profile.module.css";

import userIcon from "../../assets/userProfileIcon.png"

// Alertas
import Swal from "sweetalert2";


export default function Profile() {

    // Traemos el id del usuario con el token
    const { user } = useAuth();
    // Trae y actualiza la informacion
    const [profile, setProfile] = useState({});
    const [editing, setEditing] = useState(false);
    // Vista del modal
    const [showPasswordModal, setShowPassswordModal] = useState(false);
    // peticion de documentos
    const [documents, setDocument] = useState([]);
    // Actualizacion de contraseña (Actual, Nueva, Confirmacion)
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // // Visibilidad de las contraseña
    const [showPass, setShowPass] = useState(false);
    // Cambio de imagen de perfil
    const [selectedImage, setSelectedImage] = useState(null);
    // prefijo
    const [country, setCountry] = useState("CO");
    const [ showCountries, setShowCountries] = useState(false);
    const prefixRef = useRef(null)

    // Obtenemos la informacion de los documentos exitentes
    useEffect(() => {
        const obtainDocuments = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/documents");

                setDocument(response.data)
            } catch (error) {
                console.error ("Error al obtener los documentos", error);
            }
        };

        obtainDocuments();
    }, []);

    // Obtenemos la informacion del usuario
    useEffect(() => {
        const obtainUser = async () => {
            try {
                const token = 
                    localStorage.getItem("token") ||
                    sessionStorage.getItem("token");

                const response = await axios.get("http://127.0.0.1:8000/api/usuarios",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("RESPUESTA PERFIL:", response.data);

                setProfile(response.data);

            } catch (error) {
                console.error("Error al obtener el perfil", error);
            }
        };

        if(user){
            obtainUser();
        }
    }, [user]);

    // Actualizacion de datos del usuario
    const editProfile = async () => {
        try {
            const token = 
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

            // Guardamos la imagen del usuario
            const formData = new FormData(); 

            Object.keys(profile).forEach((key) => {
                if(
                    key !== "id" && key !== "rol" && key !== "membresia" && key !== "imagen_Usuario" 
                ){
                    formData.append(key, profile[key] ?? "");
                }
            });

            // Podemos enviar la imagen al back
            if(selectedImage) {
                formData.append("imagen_Usuario", selectedImage);
            }

            formData.append("_method", "PUT");

            const response = await axios.post(`http://127.0.0.1:8000/api/usuarios/${profile.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProfile(response.data.data);
            setSelectedImage(null);
            setEditing(false);

            Swal.fire('Perfil actualizado', 'el perfil ha sido actualizado correctamete', 'success');

        } catch (error) {
            console.error("Error al actualizar el perfil", error);
            Swal.fire('Error', 'No se pudo actualizar el perfil', 'error');
        }
    };

    // Cambio de contraseña
    const editPassword = async () => {
        try{
            const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

            await axios.put("http://127.0.0.1:8000/api/passwordChange",
                {
                    usuario_id: profile.id,
                    currentPassword,
                    newPassword,
                    confirmPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            Swal.fire('Contraseña cambiada', 'La contraseña se ha cambiado correctamente,  te enviamos un correo de confirmación para que estés tranquilo."', 'success');

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowPassswordModal(false);

        } catch (error) {
            console.error("Error:", error.response?.data);
            Swal.fire('Contraseña incorrecta', error.response?.data?.mensaje || 'Verifica las contraseñas ingresadas', 'warning');
        }
    }

     // funcionalidad para el boton editar y lo inputs
    const handelChange = (e) => {
        const {name, value} = e.target;

        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Click por fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(prefixRef.current && !prefixRef.current.contains(e.target)){
                setShowCountries(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    })

    return (
        <>
            <NavBar></NavBar>

            {showPasswordModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.passwordModal}>
                        <h2>Cambio de contraseña</h2>

                        <aside className={styles.leyend}>
                            Tu cuenta es como nuestra receta: <strong>única y privada.</strong>  Cambia tu contraseña para que solo tú tengas la llave de tus pedidos.
                        </aside>

                        {/* Contraseña actual */}
                        <input 
                            type={showPass ? "text" : "password"}
                            placeholder='Contraseña actual'
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <label htmlFor="">Contraseña actual <span className={styles.required}>*</span></label>
                        <span className={styles.toggle} onClick={() => setShowPass(!showPass)}>
                            <i className={showPass ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                        </span>
                        {/* Contraseña nueva */}
                        <input 
                            type={showPass ? "text" : "password"}
                            placeholder='Nueva contraseña'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label htmlFor="">Contraseña Nueva <span className={styles.required}>*</span></label>
                        <span className={styles.toggle} onClick={() => setShowPass(!showPass)}>
                            <i className={showPass ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                        </span>
                        {/* Confirmacion contraseña */}
                        <input 
                            type={showPass ? "text" : "password"}
                            placeholder='Confirmar nueva contraseña'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label htmlFor="">Confirmar contraseña <span className={styles.required}>*</span></label>
                        <span className={styles.toggle} onClick={() => setShowPass(!showPass)}>
                            <i className={showPass ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                        </span>
                    </div>

                    <button onClick={() => setShowPassswordModal(false)}>
                        cancelar
                    </button>

                    <button onClick={editPassword}>Cambiar</button>
                </div>
            )}

            <div className={styles.container}>
                <h1>Mi perfil</h1>

                {/* Boton de edicion del perfil */}
                <button 
                    className={styles.editProfile}
                    onClick={editing ? editProfile : () => setEditing(true)}
                >
                    <i className={`bx ${editing ? "bx-save" : "bx-pencil"}`}></i>
                    {editing ? "Guardar" : "Editar"}
                </button>

                {/* Primera seccion de informacion del usuario */}
                <header className={styles.oneInfo}>
                    {/* Imagen */}
                    <div className={styles.containerImage}>
                        <img src={profile.imagen_Usuario?.startsWith("blob:")
                                ? profile.imagen_Usuario
                                : profile.imagen_Usuario
                                    ? `http://127.0.0.1:8000/storage/${profile.imagen_Usuario}`
                                    : userIcon
                        } alt="Imagen-usuario" /> 
                    </div>
                    {/* Rol y nombres */}
                    <div className={styles.containerName}>
                        <p className={styles.names}>{profile.nombres} {profile.apellidos}</p>
                        <p className={styles.role}>{profile.rol?.nombre || "Cliente"}</p>
                    </div>
                    {/* Plan */}
                    <div className={styles.containerPlan}>
                        <label className={styles.editImage} style={{ pointerEvents: editing ? "auto" : "none"}}>
                            Cambiar foto
                            <input 
                                type='file'
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    if(file) {
                                        setSelectedImage(file);

                                        setProfile(prev =>({
                                            ...prev,
                                            imagen_Usuario: URL.createObjectURL(file)
                                        }));
                                    }
                                }}
                            />
                        </label>
                        {/* Hacer que funcione correctamente este boton para que pueda cambiar la imagen el usuario */}
                        <p>{profile.membresia?.nombre || "Sin plan"}</p>
                    </div>
                </header>

                {/* Segunda seccion de los datos del usuario */}
                <section className={styles.sectionOne}>
                    <div className={styles.containerInformation}>
                        <h4>Información personal</h4>
                        <button
                            onClick={() => setShowPassswordModal(true)}
                            disabled={!editing}
                        >Cambiar contraseña</button>
                    </div>

                    <div className={styles.dottedDivider}></div>

                    <div className={styles.containerData}>
                        {/* Hacer que le prefijo se visualice de la misma manera que se visualiza en el register */}
                        {profileFields
                            .filter(field => {
                                if (field.section !== "initial") return false;

                                if(field.name === "correo_Personal"){
                                    return profile.rol?.nombreRol === "cliente";
                                }

                                if(field.name === "correo_Empresarial") {
                                    return profile.rol?.nombreRol === "admin";
                                }

                                return true;
                            })
                            .map(field => (
                                <div key={field.name} className={styles.inputsGroup}>

                                    {field.name === "prefijo" ? (
                                        <div className={styles.phoneGroup}>
                                            <div className={styles.prefixContainer}>
                                                <div ref={prefixRef}>
                                                    <button 
                                                        type="button"
                                                        className={styles.prefix}
                                                        disabled={!editing}
                                                        onClick={() => setShowCountries(!showCountries)}
                                                    >
                                                        {flags[country] && (() =>{
                                                            const Flag = flags[country];

                                                            return (
                                                                    <>
                                                                        <Flag className={styles.flags} />
                                                                        <span>+{getCountryCallingCode(country)}</span>
                                                                    </>
                                                                );
                                                        })()}
                                                    </button>

                                                    {showCountries && (
                                                        <div className={styles.countriesList}>
                                                            {getCountries().map((c) =>(
                                                                <button
                                                                    type="button"
                                                                    key={c}
                                                                    disabled={!editing}
                                                                    onClick={() => {
                                                                        setCountry(c);

                                                                        setProfile(prev => ({
                                                                            ...prev,
                                                                            prefijo: `+${getCountryCallingCode(c)}`
                                                                        }));
                                                                        setShowCountries(false);
                                                                    }}
                                                                >
                                                                    {flags[c] && (() => {
                                                                        const Flag = flags[c];

                                                                        return (
                                                                                <>
                                                                                    <span>+{getCountryCallingCode(c)}</span>
                                                                                </>
                                                                            );
                                                                    }) ()}
                                                                </button>
                                                            ))}
                                                        </div>
                                                        )}
                                                    </div>
                                                </div>
                                            <label>{field.label}</label>

                                            <div className={styles.phoneInput}>
                                                <label>Número celular</label>
                                                <input
                                                    type="tel"
                                                    name="numero_Celular"
                                                    value={profile.numero_Celular || ""}
                                                    readOnly={!editing}
                                                    onChange={handelChange}
                                                />
                                            </div>
                                        </div>
                                    ) : field.name === "numero_Celular" ? null : ( 
                                        field.type === "select" ? (
                                            <>
                                                <select
                                                    name={field.name}
                                                    value={profile[field.name] || ""}
                                                    disabled={!editing}
                                                    onChange={handelChange}
                                                >
                                                    <option value="">Seleccionar</option>

                                                    {documents.map(document => (
                                                        <option key={document.id} value={document.id} >
                                                            {document.nombre}
                                                        </option>
                                                    ))}
                                                </select>

                                                <label>{field.label}</label>
                                            </>
                                            ) : (
                                                <>
                                                    <input 
                                                        type={field.type}
                                                        name={field.name}
                                                        value={profile[field.name] || ""}
                                                        readOnly={!editing}
                                                        onChange={handelChange}
                                                    />
                                                    <label>{field.label}</label>
                                                </>
                                        ))}
                                </div>
                            ))}
                    </div>
                </section>

                {/* Tercera seccion sobre los datos adicionales del usuario */}
                <section className={styles.sectionTwo}>
                    <div className={styles.containerInformation}>
                        <h4>Dirección</h4>
                    </div>

                    <div className={styles.dottedDivider}></div>

                    <div className={styles.containerData}>
                        {profileFields
                            .filter(field => field.section === "address")
                            .map(field => (
                                <div key={field.name} className={styles.inputsGroup}>
                                    <label>{field.label}</label>
                                    {field.type === "textarea" ? (
                                            <textarea
                                                name={field.name}
                                                value={profile[field.name] || ""}
                                                readOnly={!editing}
                                                onChange={handelChange}
                                            />
                                        ): (
                                            <input 
                                                type={field.type}
                                                name={field.name}
                                                value={profile[field.name] || ""}
                                                readOnly={!editing}
                                                onChange={handelChange}
                                            />
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </section>
            </div>
        </>
    );
}