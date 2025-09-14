import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    // Si el contexto es null/undefined, significa que el componente
    // se está renderizando fuera del AuthProvider
    if (context === undefined || context === null) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    
    return context;
};