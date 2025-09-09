// import { useState } from 'react'
import { AuthProvider} from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import './App.css'


import Login from "./pages/Login";

function AppRoutes() {
  const { user } = useAuth();
  console.log("Usuario en AppRoutes:", user);

  return (
    <Routes>
          {/* Usuario no logueado → Login visible */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );

}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
