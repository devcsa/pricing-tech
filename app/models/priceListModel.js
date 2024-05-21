const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query(
         "SELECT price_list.*, produtos.produto AS produto, produtos.unidades_caixa AS unidades_caixa FROM price_list INNER JOIN produtos ON price_list.produto_id = produtos.id",
         (err, result) => {
            if (err) {
               reject(`Erro ao recuperar lista de preços: ${err}`);
            } else {
               resolve(result);
            }
         }
      );
   });
};

const getOne = async (id) => {
   return new Promise((resolve, reject) => {
      con.query(
         `SELECT price_list.*, produtos.produto AS produto, produtos.unidades_caixa AS unidades_caixa FROM price_list INNER JOIN produtos ON price_list.produto_id = produtos.id WHERE price_list.produto_id = ${id}`,
         (err, result) => {
            if (err) {
               reject(`Erro ao recuperar lista de preços: ${err}`);
            } else {
               resolve(result[0]);
            }
         }
      );
   }).catch((error) => {
      throw new Error(`Erro ao localizar produto: ${error}`);
   });
};

module.exports = { getAll, getOne };
