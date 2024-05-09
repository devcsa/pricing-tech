const mysql = require("mysql");
const fs = require("fs");

function connectToDatabase() {
   const con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
   });

   con.connect((err) => {
      if (err) {
         console.error("Erro ao conectar ao banco de dados:", err.message);
         return;
      }
      console.log(`Banco de Dados Conectado: ${process.env.NODE_ENV}`);
   });

   module.exports = con;
}

module.exports = { connectToDatabase };
