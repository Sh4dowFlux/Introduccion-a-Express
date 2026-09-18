// utilidades/validaciones.js

// Validar que el nombre tenga mínimo 3 letras
const validarNombre = (nombre) => {
    if (!nombre || typeof nombre !== "string") return false;
    return nombre.trim().length >= 3;
};

// Validar correo electrónico con expresiones regulares
const validarCorreo = (correo) => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
};

// Generar un ID automático
const generarId = () => {
    return Date.now();
};

module.exports = {
    validarNombre,
    validarCorreo,
    generarId,
};