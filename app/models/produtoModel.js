const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query("SELECT * FROM produtos ORDER BY produto ASC", (err, result) => {
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
      con.query(`SELECT * FROM produtos WHERE id = ${id}`, (err, result) => {
         if (err) {
            reject(`Erro ao localizar produtos: ${err}`);
         } else {
            resolve(result[0]);
         }
      });
   }).catch((error) => {
      throw new Error(`Erro ao localizar produtos: ${error}`);
   });
};

const filterProduto = async (produto) => {
   return new Promise((resolve, reject) => {
      con.query(`SELECT * FROM produtos WHERE produto LIKE '%${produto}%'`, (err, result) => {
         if (err) {
            reject(`Erro ao localizar impostos: ${err}`);
         } else {
            resolve(result);
         }
      });
   }).catch((error) => {
      throw new Error(`Erro ao localizar produtos: ${error}`);
   });
};

module.exports = { getAll, getOne, filterProduto };
