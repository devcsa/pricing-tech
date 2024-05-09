const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query("SELECT encargos_financeiros.*, segmento.segmento AS segmento FROM encargos_financeiros INNER JOIN segmento ON encargos_financeiros.segmento_id = segmento.id", (err, result) => {
         if (err) {
            reject(`Erro ao recuperar os dados: ${err}`);
         } else {
            resolve(result);
         }
      });
   });
};

const getOne = async (filter) => {
   try {
      let query = `
         SELECT encargos_financeiros.*, segmento.segmento AS segmento
         FROM encargos_financeiros
         INNER JOIN segmento ON encargos_financeiros.segmento_id = segmento.id
         WHERE encargos_financeiros.type = 'EXCECAO'
         AND encargos_financeiros.segmento_id = ${filter.segmento_id}
         AND encargos_financeiros.product_group = '${filter.product_group}'
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
         query = `SELECT * FROM encargos_financeiros WHERE type = 'PADRAO' AND product_group = '${filter.product_group}'`;

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
      throw new Error(`Erro ao localizar encargo financeiro: ${error}`);
   }
};

module.exports = { getAll, getOne };
