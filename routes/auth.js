
const  {Router}= require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, existeEmail, existeUsuarioId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/valiar-campos');
const router= Router();


router.post('/login', [
    check('correo','El coreo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
    validarCampos,
],login);

module.exports= router;