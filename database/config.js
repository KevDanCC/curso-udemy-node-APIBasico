const monoose= require('mongoose');


const dbConnection = async() =>{

    try {
        await monoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true,
            // useFindAndModify: false

        })
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión de D.B');
    }

    console.log('Base de datos online');
}



module.exports={
    dbConnection
}