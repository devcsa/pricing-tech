const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query(
         "SELECT rotas.*, micro_regiao.micro_regiao AS micro_regiao, segmento.segmento AS segmento, origem_destino.origem as origem, origem_destino.destino as destino FROM rotas INNER JOIN micro_regiao ON rotas.micro_regiao_id = micro_regiao.id INNER JOIN segmento ON rotas.segmento_id = segmento.id INNER JOIN origem_destino ON rotas.origem_destino_id = origem_destino.id",
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

const getOne = async (filter) => {
   try {
      let query = `
         SELECT
            rotas.*,
            micro_regiao.micro_regiao AS micro_regiao,
            segmento.segmento AS segmento,
            origem_destino.origem AS origem,
            origem_destino.destino AS destino
         FROM
            rotas
         INNER JOIN micro_regiao ON rotas.micro_regiao_id = micro_regiao.id
         INNER JOIN segmento ON rotas.segmento_id = segmento.id
         INNER JOIN origem_destino ON rotas.origem_destino_id = origem_destino.id
         WHERE rotas.type = 'EXCECAO'
         AND rotas.micro_regiao_id = ${filter.micro_regiao_id}
         AND rotas.segmento_id = ${filter.segmento_id}
         AND rotas.category = '${filter.category}'
      `;

      let queryResult = await new Promise((resolve, reject) => {
         con.query(query, (err, result) => {
            if (err) {
               reject(err);
            } else {
               resolve(result);
            }
         });
      });

      if (queryResult.length === 0) {
         query = `
         SELECT
            rotas.*,
            micro_regiao.micro_regiao AS micro_regiao,
            segmento.segmento AS segmento,
            origem_destino.origem AS origem,
            origem_destino.destino AS destino
         FROM
            rotas
         INNER JOIN micro_regiao ON rotas.micro_regiao_id = micro_regiao.id
         INNER JOIN segmento ON rotas.segmento_id = segmento.id
         INNER JOIN origem_destino ON rotas.origem_destino_id = origem_destino.id
         WHERE rotas.type = 'PADRAO'
         AND rotas.micro_regiao_id = ${filter.micro_regiao_id}
         AND rotas.segmento_id = ${filter.segmento_id}
         AND rotas.commodity = '${filter.commodity}'
      `;

         queryResult = await new Promise((resolve, reject) => {
            con.query(query, (err, result) => {
               if (err) {
                  reject(err);
               } else {
                  resolve(result);
               }
            });
         });
      }

      return queryResult[0];
   } catch (error) {
      throw new Error(`Erro ao localizar rota: ${error}`);
   }
};

module.exports = { getAll, getOne };
