const { getConnection } = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         connection.query("SELECT * FROM micro_regiao ORDER BY micro_regiao ASC", (err, result) => {
            connection.release();
            if (err) {
               reject(`Erro ao recuperar os dados: ${err}`);
            } else {
               resolve(result);
            }
         });
      });
   });
};

const getOne = async (id) => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         connection.query(`SELECT * FROM micro_regiao WHERE id = ${id}`, (err, result) => {
            connection.release();
            if (err) {
               reject(`Erro ao localizar região: ${err}`);
            } else {
               resolve(result[0]);
            }
         });
      }).catch((error) => {
         throw new Error(`Erro ao localizar região: ${error}`);
      });
   });
};

module.exports = { getAll, getOne };
