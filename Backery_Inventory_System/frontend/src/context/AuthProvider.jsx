import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("user");
        if(usuarioGuardado){
            setUser(JSON.parse(usuarioGuardado));
        }
        setLoading(false);
    }, []);

    const login = (usuario) => {
        setUser(usuario);
        localStorage.setItem("user", JSON.stringify(usuario));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}