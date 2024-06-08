const { getConnection } = require("../config/connection");

// Função para obter todos os registros de margem e markup
const getAll = async () => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         const query = `
        SELECT margem_markup.*,
               micro_regiao.micro_regiao AS micro_regiao,
               segmento.segmento AS segmento,
               produtos.produto AS produto
        FROM margem_markup
        INNER JOIN micro_regiao ON margem_markup.micro_regiao_id = micro_regiao.id
        INNER JOIN segmento ON margem_markup.segmento_id = segmento.id
        INNER JOIN produtos ON margem_markup.produto_id = produtos.id`;

         connection.query(query, (err, result) => {
            // Sempre liberar a conexão após a consulta
            connection.release();

            if (err) {
               reject(`Erro ao recuperar os dados: ${err}`);
            } else {
               resolve(result);
            }
         });
      });
   }).catch((error) => {
      throw new Error(`Erro ao localizar margem e markup: ${error}`);
   });
};

// Função para obter um registro específico de margem e markup
const getOne = async (margem_markup) => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }

         const query = `
        SELECT margem_markup.*,
               micro_regiao.micro_regiao AS micro_regiao,
               micro_regiao.incentivized_area AS incentivized_area,
               micro_regiao.credito_pis_cofins AS credito_pis_cofins,
               segmento.segmento AS segmento,
               produtos.produto AS produto
        FROM margem_markup
        INNER JOIN micro_regiao ON margem_markup.micro_regiao_id = micro_regiao.id
        INNER JOIN segmento ON margem_markup.segmento_id = segmento.id
        INNER JOIN produtos ON margem_markup.produto_id = produtos.id
        WHERE margem_markup.micro_regiao_id = ?
          AND margem_markup.segmento_id = ?
          AND margem_markup.produto_id = ?`;

         const params = [margem_markup.micro_regiao_id, margem_markup.segmento_id, margem_markup.produto_id];

         connection.query(query, params, (err, result) => {
            // Sempre liberar a conexão após a consulta
            connection.release();

            if (err) {
               reject(`Erro ao localizar margem e markup: ${err}`);
            } else {
               resolve(result[0]); // Considera que deve retornar um único registro
            }
         });
      });
   }).catch((error) => {
      throw new Error(`Erro ao localizar margem e markup: ${error}`);
   });
};

module.exports = { getAll, getOne };
