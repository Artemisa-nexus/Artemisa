import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306,      
  password: "admin123",
  database: "artemisa"
});

async function probarConexionBaseDatos() {
  try{
    const connection = await  pool.getConnection();
    console.log('Conexion database exitosa')
    connection.release();
  }catch(error){
    console.error('Error al conectar la base de datos', error.message);
  }
  
}

probarConexionBaseDatos()