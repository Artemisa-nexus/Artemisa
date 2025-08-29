import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,      
  password: DB_PASSWORD,
  database: DB_NAME
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