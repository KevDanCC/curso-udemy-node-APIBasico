const express = require('express');
const fileUpload= require('express-fileupload');
const cors = require('cors');
const { dbConnection } = require('../database/config');




class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths={
            usuarios:'/api/usuarios',
            auth:'/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar:'/api/buscar',
            uploads:'/api/uploads'
        }


        //Conectar a B.D
        this.conectarDB();

        //Middlewares
        //Funciones que añaden otra funcionalidad la web server  ::
        this.middleware();

        //Rutas de aplicación
        this.routes();
    }


    async conectarDB() {
        await dbConnection();
    }


    middleware() {

        this.app.use(cors());

        //Parseo y lectura de Body
        this.app.use(express.json());


        //directorio publico
        this.app.use(express.static('public'));

        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }


    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server.... en puerto ', this.port);
        });
    } 


}


module.exports = Server;