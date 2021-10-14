const mariadb = require('mariadb');

const config = {

    host    : 'localhost',
    user    : 'root',
    password: '123',
    database: 'prueba',
    port    : '3307'
}

var conexion;

try {
    conexion=mariadb.createPool(config);    
} catch (error) {
    console.log("Error en la conexión: ",error);
}

module.exports=conexion;