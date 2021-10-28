const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (request, response, next) => {
    const token = request.header('x-token');
    if (!token) {
        return response.status(401).json({
            msg: 'No hay token en peticion'
        })
    }


    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return response.status(401).json({
                msg: 'Usuario no existe en BD'
            })
        }

        //Verificar si uid es true
        if (!usuario.estado) {
            return response.status(401).json({
                msg: 'Token no valido -Usuario autenticado es invalido-'
            })
        }

        request.usuario = usuario;
        request.uid = uid;
        next();

    } catch (error) {
        console.log(error);
        response.status(401).json({
            msg: 'token no valido'
        })
    }

}

module.exports = {
    validarJWT
}