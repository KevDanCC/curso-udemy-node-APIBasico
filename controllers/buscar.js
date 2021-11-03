const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require('../models/index');


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]


const buscarUsuarios = async (termino = '', response) => {

    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return response.json({
            results: usuario ? [usuario] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{estado:true}]
    });
    response.json({
        results: usuarios
    })

}


const buscarCategoria = async (termino = '', response) => {

    const regex = new RegExp(termino, 'i');

    const categoria = await Categoria.find({
        $or: [{ nombre: regex }],
        $and: [{estado:true}]
    });
    response.json({
        results: categoria
    })

}


const buscarProducto = async (termino = '', response) => {

    const regex = new RegExp(termino, 'i');

    const producto = await Producto.find({
        $or: [{ nombre: regex }],
        $and: [{estado:true}]
    }).populate('categoria','nombre');
    response.json({
        results: producto
    })

}


const buscar = (request, response) => {

    const { coleccion, termino } = request.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return response.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, response)

            break;
        case 'categorias':
            buscarCategoria(termino, response)

            break;
        case 'productos':
            buscarProducto(termino, response)

            break;

        default:
            response.status(500).json({
                msg: 'Busqueda no implementada'
            });
    }


}


module.exports = {
    buscar
}