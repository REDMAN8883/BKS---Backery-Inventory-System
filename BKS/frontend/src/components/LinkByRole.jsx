const linksPorRol = {
    admin: [
        { path: "/admin/inicio", label: "Inicio", id: "catalog"},
        { path: "/admin/categorias", label: "Categorías" },
        { path: "/admin/recetas", label: "Recetas" },
        { path: "/admin/Ventas", label: "Ventas" },
        { path: "/login", label: "Login" },
    ],
    cliente: [
        { path: "/cliente/inicio", label: "Inicio" },
        { path: "/cliente/categorias", label: "Categorías" },
        { path: "/cliente/recetas", label: "Recetas" },
        { path: "/cliente/pedidos", label: "Pedidos" },
        { path: "/cliente/perfil", label: "Perfil" },
        { path: "/login", label: "cerrar" },
    ],
};

export default linksPorRol;