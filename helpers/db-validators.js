const Role= require('../models/role');
const Usuario= require('../models/usuario');


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


module.exports={
    esRoleValido,
    existeEmail,
    existeUsuarioId
}