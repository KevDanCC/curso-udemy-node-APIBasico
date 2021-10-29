const { response } = import('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

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


const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({correo});
        console.log(usuario);
        if (!usuario) {
            //Tengo que crear
            const data = {
                nombre,
                correo,
                password: ':D',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }
        //usuario en bd es inactivo?
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador'
            });
        }

        //Genrerar JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            mgs: 'El token no se pudo verificar',error,
            ok: false
        })
    }


}

module.exports = {
    login,
    googleSignIn
}