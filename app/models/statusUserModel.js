const { getConnection } = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         connection.query("SELECT * FROM status_user", (err, result) => {
            connection.release(); // Libera a conexão de volta para o pool
            if (err) {
               reject(`Erro ao recuperar os dados: ${err}`);
            } else {
               resolve(result);
            }
         });
      });
   });
};

module.exports = { getAll };
