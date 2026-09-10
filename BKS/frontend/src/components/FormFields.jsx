// Inputs del perfil
export const profileFields = [
    // Section One
    {name: "nombres", label: "Nombres", type: "text", section: "initial"},
    {name: "apellidos", label: "Apellidos", type: "text", section: "initial"},
    {name: "numero_Documento", label: "Numero de documento", type: "number", pattern: "[0-9]*", section: "initial"},
    {name: "id_Document", label: "Tipo de documento", type: "select", section: "initial"},
    {name: "prefijo", label: "Prefijo", section: "initial"},
    {name: "numero_Celular", label: "Numero celular", type: "tel", section: "initial"},
    {name: "correo_Empresarial", label: "Correo electronico", type: "email", section: "initial"},
    {name: "correo_Personal", label: "Correo electronico", type: "email", section: "initial"},

    // Section Two
    {name: "barrio", label: "Barrio", type: "text", section: "address"},
    {name: "ciudad", label: "Ciudad", type: "text", section: "address"},
    {name: "direcion", label: "Dirección", type: "text", section: "address"},
    {name: "codigo_Postal", label: "Codigo postal", type: "number", section: "address"},
    {name: "indicaciones_Adicionales", label: "Indicaciones adicionales", type: "textarea", section: "address"}
]