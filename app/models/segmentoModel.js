const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query("SELECT * FROM segmento ORDER BY segmento ASC", (err, result) => {
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
      con.query(`SELECT * FROM segmento WHERE id = ${id}`, (err, result) => {
         if (err) {
            reject(`Erro ao localizar segmento: ${err}`);
         } else {
            resolve(result[0]);
         }
      });
   }).catch((error) => {
      throw new Error(`Erro ao localizar segmento: ${error}`);
   });
};

module.exports = { getAll, getOne };
