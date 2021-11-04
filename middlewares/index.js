const validarCampos = require('../middlewares/valiar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/validar-archivos');


module.exports={
    ...validarCampos,
    ...validarJwt,
    ...validarRoles,
    ...validarArchivo
}