const validarCampos = require('../middlewares/valiar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');


module.exports={
    ...validarCampos,
    ...validarJwt,
    ...validarRoles
}