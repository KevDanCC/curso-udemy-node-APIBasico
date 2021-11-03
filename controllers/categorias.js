const { response, request } = require('express');
const { Categoria } = require('../models/index');


//obtenerCategorias  -paginado  - total  -populate
const obtenerCategorias = async (request, response) => {
    const { limite = 5, desde = 0 } = request.query;
    const query = { estado: true }


    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate("usuario", { "nombre": 1, "correo": 1 })
    ]);

    response.json({
        total,
        categorias
    });
}

//obtenerCategoria   - populate{}
const obtenerCategoria = async (request, response) => {
    const id = request.params.id;
    console.log(id);
    const categoria = await Categoria.findById(id);

    response.json({
        categoria
    });
}


const crearCategoria = async (request, response) => {
    const nombre = request.body.nombre.toString().toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return response.status(400).json({
            msg: `La categoria ${categoriaDB} ya existe!`
        })
    }

    //Generar data a guardar
    const data = {
        nombre,
        usuario: request.usuario._id
    }

    const categoria = new Categoria(data);

    //Guardar DB
    await categoria.save();
    response.status(201).json(categoria);

}


//actualizarCategoria                se recibe nombre
const actualizarCategoria = async (request, response) => {
    const id = request.params.id;
    const { estado,usuario, ...restoElementos } = request.body;
    restoElementos.nombre= restoElementos.nombre.toUpperCase();
    restoElementos.usuario= request.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id, restoElementos, { new: true });
    response.status(201).json({
        categoria
    });
}


//borrarCategoria    -estado:false    se recibe id
const borrarCategoria = async (request, response) => {
    const id = request.params.id;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, {new:true});

    response.status(201).json({
       categoria
    });
}

module.exports = {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria


}