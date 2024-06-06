const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query(
         "SELECT margem_markup.*, micro_regiao.micro_regiao AS micro_regiao, segmento.segmento AS segmento, produtos.produto AS produto FROM margem_markup INNER JOIN micro_regiao ON margem_markup.micro_regiao_id = micro_regiao.id INNER JOIN segmento ON margem_markup.segmento_id = segmento.id INNER JOIN produtos ON margem_markup.produto_id = produtos.id",
         (err, result) => {
            if (err) {
               reject(`Erro ao recuperar os dados: ${err}`);
            } else {
               resolve(result);
            }
         }
      );
   }).catch((error) => {
      throw new Error(`Erro ao localizar margem e markup: ${error}`);
   });
};

const getOne = async (margem_markup) => {
   return new Promise((resolve, reject) => {
      con.query(
         `SELECT margem_markup.*, micro_regiao.micro_regiao AS micro_regiao, micro_regiao.incentivized_area AS incentiveized_area, micro_regiao.credito_pis_cofins AS credito_pis_cofins, segmento.segmento AS segmento, produtos.produto AS produto FROM margem_markup INNER JOIN micro_regiao ON margem_markup.micro_regiao_id = micro_regiao.id INNER JOIN segmento ON margem_markup.segmento_id = segmento.id INNER JOIN produtos ON margem_markup.produto_id = produtos.id WHERE margem_markup.micro_regiao_id = ${margem_markup.micro_regiao_id} AND margem_markup.segmento_id = ${margem_markup.segmento_id} AND margem_markup.produto_id = ${margem_markup.produto_id}`,
         (err, result) => {
            if (err) {
               reject(`Erro ao localizar margem e markup: ${err}`);
            } else {
               resolve(result[0]);
            }
         }
      );
   }).catch((error) => {
      throw new Error(`Erro ao localizar margem e markup: ${error}`);
   });
};

module.exports = { getAll, getOne };
