const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query(
         "SELECT regimes.*, origem_destino.origem as origem, origem_destino.destino as destino FROM regimes INNER JOIN origem_destino ON regimes.origem_destino_id = origem_destino.id",
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

const getOne = async (regimes_especiais) => {
   return new Promise((resolve, reject) => {
      con.query(
         `SELECT regimes_especiais.*, origem_destino.origem as origem, origem_destino.destino as destino, segmento.segmento AS segmento FROM regimes_especiais INNER JOIN origem_destino ON regimes_especiais.origem_destino_id = origem_destino.id INNER JOIN segmento ON regimes_especiais.segmento_id = segmento.id WHERE regimes_especiais.origem_destino_id = ${regimes_especiais.origem_destino_id} AND regimes_especiais.segmento_id = ${regimes_especiais.segmento_id} AND regimes_especiais.ncm = ${regimes_especiais.ncm} OR regimes_especiais.ncm = 'TODOS' AND regimes_especiais.tipo_produto = ${regimes_especiais.tipo_produto} OR regimes_especiais.tipo_produto = 'TODOS' AND regimes_especiais.cesta_basica = ${regimes_especiais.cesta_basica} OR regimes_especiais.cesta_basica = 'TODOS'`,
         (err, result) => {
            if (err) {
               reject(`Erro ao localizar regimes especiais: ${err}`);
            } else {
               resolve(result[0]);
            }
         }
      );
   }).catch((error) => {
      throw new Error(`Erro ao localizar regimes especiais: ${error}`);
   });
};

module.exports = { getAll, getOne };
