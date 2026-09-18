const manejadorErrores = (error, req, res, next) => {
    const codigoError = error.statusCode || 500;
    const mensajeError = error.message || "Error inesperado"
    //mostrar error por consola
    console.error(`[Manejador de Errores] - ${new Date().toISOString} - ${mensajeError}`)
    //validar mas mensajes de errores, detalles, etc
    if(error.stack) {
        console.error(error.stack);
    }
    //mensaje
    res.json({Error: "ManejadorErrores", 
        codigoError, 
        mensajeError, 
        //validar .env si estamos en desarrollo o produccion
        ...(process.env.NODE_ENV === "development" && {stack: error.stack})
    })
}

module.exports = manejadorErrores;