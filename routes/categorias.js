
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares/index');
const router = Router();

//{{url}}/api/categorias

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtener una categoria por id- publico       vlaidar si existe la categoria?
router.get('/:id', [
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoria);

//Crear una nueva categoria - privado cualquier role con token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar un registro por cierto id -privado cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre de categoria es obligatorio').not().isEmpty(),
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], actualizarCategoria);

//Borrar una categoria en logico -Admin
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],borrarCategoria);

module.exports = router;