
const  {Router}= require('express');
const {check} = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, existeEmail, existeUsuarioId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/valiar-campos');
const router= Router();


router.get('/',usuariosGet);

router.put('/:id?',[
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('role').custom(esRoleValido),
    validarCampos
],usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail().custom(existeEmail),
    // check('role', 'No es un role permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
],usuariosPost);

router.patch('/',usuariosPatch);

router.delete('/:id',[
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
],usuariosDelete);


module.exports= router;