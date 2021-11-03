const express = require('express');
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
            buscar:'/api/buscar'
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
    }


    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server.... en puerto ', this.port);
        });
    } 


}


module.exports = Server;