const path = require('path');
const { v4: uuidv4 } = require('uuid');


const subirArchivo = (files, extensionesPermitidas = ['png', 'jpg', 'jpeg', 'gif'],carpeta='') => {

    return new Promise((resolve, reject) => {
        //Se obtiene el nombre del archivo
        if(!files){
            return reject(`No se ha enviado un archivo`);
        }
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar la extensión
        if (!extensionesPermitidas.includes(extension)) {
            return reject(`La extensión ${extension} no es valida, ${extensionesPermitidas}`);
        }

        const nombreTemporal = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta,nombreTemporal);

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

           resolve(nombreTemporal);
        });
    })


}

module.exports = {
    subirArchivo
}