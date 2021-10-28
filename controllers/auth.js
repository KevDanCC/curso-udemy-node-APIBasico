const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {

        //Verificar si email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -Correo'
            })
        }

        //ver si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -estado false'
            })
        }

        //Verificar la contraseña             //verifica si hacne match las pass
        const validPass = bcryptjs.compareSync(password, usuario.password);
        if (!validPass) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -password'
            })
        }
        //Genrerar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal'
        })
    }

}

module.exports = {
    login
}