const path = require('path');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { request, response } = require('express');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require('../helpers');

const { Usuario, Producto } = require('../models');


const cargarArchivo = async (req = request, resp = response) => {
    try {
        // const nombre = await subirArchivo(req.files,['txt','md'],'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        resp.json({
            path: nombre
        })
    } catch (error) {
        resp.status(400).json({
            err: error
        })
    }
}



const actualizarImagen = async (request = request, response = response) => {
    const { id, coleccion } = request.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return response.status(400).json({
                    msg: 'No existe usuario con ese id'
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return response.status(400).json({
                    msg: 'No existe producto con ese id'
                });
            }
            break;
        default:
            return response.status(500).json({
                msg: 'Situacion no validada'
            })
    }
    try {

        //limpiar imagenes previas
        if (modelo.img) {
            //Borrar la img del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            console.log(pathImagen);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }

        const nombre = await subirArchivo(request.files, undefined, coleccion);
        modelo.img = nombre;

        await modelo.save();

        response.json(
            modelo
        )
    } catch (error) {
        return response.status(400).json({
            msg: error
        });
    }
}



const mostrarImagen = async (request = request, response = response) => {
    const { id, coleccion } = request.params;
    const noImageFound= path.join(__dirname, '../assets', 'no-image.jpg');

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return response.status(400).json({
                    msg: 'No existe usuario con ese id'
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return response.status(400).json({
                    msg: 'No existe producto con ese id'
                });
            }
            break;
        default:
            return response.status(500).json({
                msg: 'Situacion no validada'
            })
    }
    try {

        if (modelo.img) {
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            console.log(pathImagen);
            if (fs.existsSync(pathImagen)) {
                return response.sendFile(pathImagen);
            }
        }

        return response.sendFile(noImageFound);

    } catch (error) {
        return response.status(400).json({
            msg: error
        });
    }

}




const actualizarImagenCloudinary = async (request = request, response = response) => {
    const { id, coleccion } = request.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return response.status(400).json({
                    msg: 'No existe usuario con ese id'
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return response.status(400).json({
                    msg: 'No existe producto con ese id'
                });
            }
            break;
        default:
            return response.status(500).json({
                msg: 'Situacion no validada'
            })
    }
    try {

        //limpiar imagenes previas
        if (modelo.img) {
            const nombreArr= modelo.img.split('/');
            const nombre=nombreArr[nombreArr.length-1];
            const [public_id,extra]=nombre.split('.');
            console.log(public_id);
             cloudinary.uploader.destroy(public_id);
        }

        const {tempFilePath}= request.files.archivo;
        const {secure_url,...rest}=await cloudinary.uploader.upload(tempFilePath,);
        console.log(rest);
        modelo.img = secure_url;
        cloudinary.url

        await modelo.save();

        response.json(
            modelo
        )
    } catch (error) {
        return response.status(400).json({
            msg: error
        });
    }
}



const mostrarImagenCloudinary = async (request = request, response = response) => {
    const { id, coleccion } = request.params;
    const noImageFound= path.join(__dirname, '../assets', 'no-image.jpg');

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return response.status(400).json({
                    msg: 'No existe usuario con ese id'
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return response.status(400).json({
                    msg: 'No existe producto con ese id'
                });
            }
            break;
        default:
            return response.status(500).json({
                msg: 'Situacion no validada'
            })
    }
    try {

        if (modelo.img) {
            // const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            // console.log(pathImagen);
            // if (fs.existsSync(pathImagen)) {
                // return response.sendFile(pathImagen);
            // }
            return response.redirect(modelo.img);
        }

        return response.sendFile(noImageFound);

    } catch (error) {
        return response.status(400).json({
            msg: error
        });
    }

}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
    mostrarImagenCloudinary
}