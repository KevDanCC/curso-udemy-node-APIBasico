const { Categoria,Role,Usuario,Producto } = require('../models/index');
// const Role= require('../models/role');
// const Usuario= require('../models/usuario');


const esRoleValido=async(role='')=>{
    const existeRol= await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El rol ${role} no esta registrado en BD`);
    }
}


const existeEmail=async(correo='')=>{
    const existeEmail= await Usuario.findOne({correo});
    if(existeEmail){
           throw new Error('El correo ya esta registrado');
}
}

const existeUsuarioId=async(id='')=>{
    console.log(id);
    const existeId= await Usuario.findById(id);
    if(!existeId){
           throw new Error(`Este id no existe: ${id}`);
}
}

const existeCategoria=async(id='')=>{
    console.log(id,'Validator');
    const existeId= await Categoria.findById(id);
    if(!existeId){
           throw new Error(`Este id no existe de Categoria: ${id}`);
}
}


const existeProducto=async(id='')=>{
    console.log(id,'Validator');
    const existeId= await Producto.findById(id);
    if(!existeId){
           throw new Error(`Este id no existe de Producto: ${id}`);
}
}
//validar colecciones permitidas
const coleccionesPermitidas = (coleccion='', colecciones=[])=>{
    const incluida= colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no esta permitida ::: ${colecciones}`);
    }

    return true

}

module.exports={
    esRoleValido,
    existeEmail,
    existeUsuarioId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}