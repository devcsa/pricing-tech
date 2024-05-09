const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query(
         "SELECT impostos.*, origem_destino.origem as origem, origem_destino.destino as destino FROM impostos INNER JOIN origem_destino ON impostos.origem_destino_id = origem_destino.id",
         (err, result) => {
            if (err) {
               reject(`Erro ao recuperar os dados: ${err}`);
            } else {
               resolve(result);
            }
         }
      );
   });
};

const getOne = async (impostos) => {
   return new Promise((resolve, reject) => {
      con.query(
         `SELECT impostos.*, origem_destino.origem as origem, origem_destino.destino as destino FROM impostos INNER JOIN origem_destino ON impostos.origem_destino_id = origem_destino.id WHERE impostos.origem_destino_id = ${impostos.origem_destino_id} AND impostos.ncm = '${impostos.ncm}' AND impostos.tipo_produto = '${impostos.tipo_produto}'`,
         (err, result) => {
            if (err) {
               reject(`Erro ao localizar impostos: ${err}`);
            } else {
               resolve(result[0]);
            }
         }
      );
   }).catch((error) => {
      throw new Error(`Erro ao localizar impostos: ${error}`);
   });
};

module.exports = { getAll, getOne };
