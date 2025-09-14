// import { useState } from 'react'
import { AuthProvider} from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pagina principal 
import Login from "./pages/Login";
// Importaciones de las demas vistas
import LayoutGeneral from "../Layouts/LayoutGeneral";
import Catalogo from "./pages/Catalogo";


// Wrapper para obtener ID del usuario autenticado y pasarlo al componente del usuario
// function PerfilConAuth() {
//   const { user } = useAuth();
//   if(!user) return <div>Cargando usuario...</div>;
//   return <PerfilUsuario userId={user.id} />;
// }

function normalizeRole(role) {
  const normalizedRole = role?.toLowerCase();
  return normalizedRole === 'cliente' ? 'usuario' : normalizedRole;
}

function RutasProtegidas({ allowedRoles = [], children }) {
  const { user, loading} = useAuth();
  
  if(loading) return <div>Cargando...</div>;
  // Redirecion al Login
  if(!user) return <Navigate to="/login" replace />;

  // Normalizamos los roles
  const normalizedUserRole = normalizeRole(user.rol);

  // Verficacion que el usuario este permitido
  if (allowedRoles.length > 0 && !allowedRoles.includes(normalizedUserRole)){
    return <Navigate to={`/${normalizedUserRole}`} replace/>;
  }

  return children;
}

function AppRoutes() {
  const { user, loading } = useAuth();
  
  console.log("AppRoutes - user:", user, "loading:", loading); // Debug
  
  // Mientras carga, mostrar loading
  if (loading) {
    return <div>Cargando aplicación...</div>;
  }
  
  return (
    <Routes>
      {/* Usuario no logueado → Login visible */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Compartido para todos los roles */}
      <Route 
        path="/admin/*"
        element={
          <RutasProtegidas allowedRoles={["admin", "cliente", "usuario"]}>
            <LayoutGeneral />
          </RutasProtegidas>
        }
      >
        <Route index element={<Catalogo />}/>
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default function App(){
  console.log("App component rendering"); // Debug
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

// function AppRoutes() {
//   const { user } = useAuth();
//   console.log("Usuario en AppRoutes:", user);

//   return (
//     <Routes>
//           {/* Usuario no logueado → Login visible */}
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );

// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }