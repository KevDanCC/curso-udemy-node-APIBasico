const { Router } = require('express');
const { check } = require('express-validator');
const { 
    crearProducto, 
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
 } = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares/index');
const router = Router();

//{{url}}/api/categorias

//Obtener todas las productos - publico
router.get('/', obtenerProductos);

//Obtener una productos por id- publico       vlaidar si existe el producto
router.get('/:id', [
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProducto);

//Crear una nueva productos - privado cualquier role con token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria es necesaria').not().isEmpty(),
    check('categoria', 'No es un ID Valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto);

//Actualizar un registro por cierto id -privado cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto);

//Borrar una productos en logico -Admin
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],borrarProducto);

module.exports = router;