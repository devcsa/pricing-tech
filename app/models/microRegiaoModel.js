const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query("SELECT * FROM micro_regiao ORDER BY micro_regiao ASC", (err, result) => {
         if (err) {
            reject(`Erro ao recuperar os dados: ${err}`);
         } else {
            resolve(result);
         }
      });
   });
};

const getOne = async (id) => {
   return new Promise((resolve, reject) => {
      con.query(`SELECT * FROM micro_regiao WHERE id = ${id}`, (err, result) => {
         if (err) {
            reject(`Erro ao localizar região: ${err}`);
         } else {
            resolve(result[0]);
         }
      });
   }).catch((error) => {
      throw new Error(`Erro ao localizar região: ${error}`);
   });
};

module.exports = { getAll, getOne };
