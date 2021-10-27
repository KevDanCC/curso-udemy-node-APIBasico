const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req, resp = response) => {

    const {limite=5,desde=0} = req.query;
    const query={estado:true}
    // const usuarios= await Usuario.find(query)
    //                             .skip(Number(desde))
    //                             .limit(Number(limite));
                                
    // const total= await Usuario.countDocuments(query);

    const [total, usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
    ]);
    resp.json({
        // total,
        // usuarios
        total,
        usuarios
    });
}

const usuariosPost = async (req, response) => {
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    //hacer el hash de contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar en BD
    await usuario.save();

    response.json({
        usuario
    });
}


const usuariosPut = async (req, response) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...restoElementos } = req.body;

    //TODO validar contra BD
    if (password) {
        const salt = bcryptjs.genSaltSync();
        restoElementos.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, restoElementos, { new: true });

    response.json({
        'ok': true,
        'msg': 'put API - Controller',
        usuario
    });
}

const usuariosPatch = (req, response) => {
    response.json({
        'ok': true,
        'msg': 'patch API - Controller'
    });
}

const usuariosDelete = async (req, response) => {
    const id = req.params.id;
//fisicamente el borrado
// const usuario= await Usuario.findByIdAndDelete(id);

const usuario= await Usuario.findByIdAndUpdate(id, {estado:false});



    response.json({
        usuario
    });
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}