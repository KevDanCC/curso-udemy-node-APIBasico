const { request, response } = require('express');

const esAdminRole = (request, response, next) => {

    if (!request.usuario) {
        return response.status(500).json({
            msg: `Objeto usuario ${nombre} no valido o existente`
        });
    }

    const { role, nombre } = request.usuario;
    if (role !== 'ADMIN_ROLE') {
        return response.status(401).json({
            msg: `El usuario  ${nombre} no es administrador ::`
        });
    }
    next();

}



const tieneRole = (...todosArgumentosRoles) => {

    return (request, response, next) => {
        if (!request.usuario) {
            return response.status(500).json({
                msg: `Objeto usuario ${nombre}  no valido o existente`
            });
        }

        if (!todosArgumentosRoles.includes
            (request.usuario.role)) {
            return response.status(401).json({
                msg: `El servicio requiere algo  de los siguientes roles ${todosArgumentosRoles}`
            });
        }

        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}