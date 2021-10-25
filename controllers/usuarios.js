const {response} = require('express');


const usuariosGet = (req, resp=response) => {

    const params=req.query;

    resp.json({
        'ok': true,
        'msg': 'get API - Controller',
        params
    });
}

const usuariosPost = (req, response) => {

    const {nombre,edad}=req.body;

    response.json({
        'ok': true,
        'msg': 'post API - Controller',
        nombre,
        edad
    });
}


const usuariosPut = (req, response) => {
const id=req.params.id;
console.log(id);
    response.json({
        'ok': true,
        'msg': 'put API - Controller',
        id
    });
}

const usuariosPatch = (req, response) => {
    response.json({
        'ok': true,
        'msg': 'patch API - Controller'
    });
}

const usuariosDelete = (req, response) => {
    response.json({
        'ok': true,
        'msg': 'delete API - Controller'
    });
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}