import mysql from "mysql2/promise";


const data_base = mysql.createConnection({
  host: "localhost",
  user: "root",      
  password: "admin123",
  database: "artemisa"
});

data_base.connect(err => {
  if (err) {
    console.error("Error conectando a la BD:", err);
    return;
  }
  console.log("Conectado a la BD artemisadb");
});

export default data_base;
