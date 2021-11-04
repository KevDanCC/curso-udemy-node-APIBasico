
const validarArchivoSubir = (request, response, next) => {
    if (!request.files || Object.keys(request.files).length === 0 || !request.files.archivo) {
        return response.status(400).json({
            msg: 'No hay archivos que subir  ---ValidarArchivoSubir'
        });

    }
    next();
}

module.exports = {
    validarArchivoSubir
}