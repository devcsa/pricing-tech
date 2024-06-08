const { getConnection } = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         connection.query(
            "SELECT impostos.*, origem_destino.origem as origem, origem_destino.destino as destino FROM impostos INNER JOIN origem_destino ON impostos.origem_destino_id = origem_destino.id",
            (err, result) => {
               connection.release(); // Libera a conexão de volta para o pool
               if (err) {
                  reject(`Erro ao recuperar os dados: ${err}`);
               } else {
                  resolve(result);
               }
            }
         );
      });
   });
};

const getOne = async (impostos) => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         connection.query(
            `SELECT impostos.*, origem_destino.origem as origem, origem_destino.destino as destino FROM impostos INNER JOIN origem_destino ON impostos.origem_destino_id = origem_destino.id WHERE impostos.origem_destino_id = ${impostos.origem_destino_id} AND impostos.ncm = '${impostos.ncm}' AND impostos.tipo_produto = '${impostos.tipo_produto}'`,
            (err, result) => {
               connection.release(); // Libera a conexão de volta para o pool
               if (err) {
                  reject(`Erro ao localizar impostos: ${err}`);
               } else {
                  resolve(result[0]);
               }
            }
         );
      });
   });
};

module.exports = { getAll, getOne };
