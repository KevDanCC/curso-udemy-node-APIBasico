const { response, request } = require('express');
const { Producto } = require('../models/index');


//obtenerProductos  -paginado  - total  -populate
const obtenerProductos = async (request, response) => {
    const { limite = 5, desde = 0 } = request.query;
    const query = { estado: true }


    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate("usuario", { "nombre": 1, "correo": 1 })
            .populate("categoria",{ "nombre": 1, "estado": 1 })
    ]);

    response.json({
        total,
        productos
    });
}

//obtenerCategoria   - populate{}
const obtenerProducto = async (request, response) => {
    const id = request.params.id;
    console.log(id);
    const producto = await Producto.findById( id )
                                  .populate("usuario", { "nombre": 1, "correo": 1 })
                                  .populate("categoria",{ "nombre": 1, "estado": 1 });
    console.log(producto);
    response.json({
        producto
    });
}


const crearProducto = async (request, response) => {
    // const nombre = request.body.nombre.toString().toUpperCase();
    const {estado, usuario, ...body}= request.body;

    const productoDB = await Producto.findOne({ nombre:body.nombre });
    if (productoDB) {
        return response.status(400).json({
            msg: `El producto ${nombre} ya existe!`
        })
    }

    //Generar data a guardar
    const data = {
        nombre:body.nombre.toUpperCase(),
        ...body,
        usuario:request.usuario._id
    }
console.log(data);
    const producto = new Producto(data);

    //Guardar DB
    await producto.save();
    response.status(201).json(producto);

}


//actualizarCategoria                se recibe nombre
const actualizarProducto = async (request, response) => {
    const id = request.params.id;
    const { estado,usuario,_id, ...restoElementos } = request.body;
    if(restoElementos.nombre){
    restoElementos.nombre= restoElementos.nombre.toUpperCase();
    }
    restoElementos.usuario= request.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id, restoElementos, { new: true });
    response.status(201).json({
        producto
    });
}


//borrarCategoria    -estado:false    se recibe id
const borrarProducto = async (request, response) => {
    const id = request.params.id;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, {new:true});

    response.status(201).json({
        producto
    });
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto


}