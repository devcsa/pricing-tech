const { getConnection } = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         connection.query(
            "SELECT price_list.*, produtos.produto AS produto, produtos.unidades_caixa AS unidades_caixa FROM price_list INNER JOIN produtos ON price_list.produto_id = produtos.id",
            (err, result) => {
               connection.release();
               if (err) {
                  reject(`Erro ao recuperar lista de preços: ${err}`);
               } else {
                  resolve(result);
               }
            }
         );
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
         connection.query(
            `SELECT price_list.*, produtos.produto AS produto, produtos.unidades_caixa AS unidades_caixa FROM price_list INNER JOIN produtos ON price_list.produto_id = produtos.id WHERE price_list.produto_id = ${id}`,
            (err, result) => {
               connection.release();
               if (err) {
                  reject(`Erro ao recuperar lista de preços: ${err}`);
               } else {
                  resolve(result[0]);
               }
            }
         );
      });
   });
};

module.exports = { getAll, getOne };
