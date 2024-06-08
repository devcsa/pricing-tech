const { getConnection } = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      getConnection((err, con) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         con.query("SELECT encargos_financeiros.*, segmento.segmento AS segmento FROM encargos_financeiros INNER JOIN segmento ON encargos_financeiros.segmento_id = segmento.id", (err, result) => {
            con.release();
            if (err) {
               reject(`Erro ao recuperar os dados: ${err}`);
            } else {
               resolve(result);
            }
         });
      });
   });
};

const getOne = async (filter) => {
   try {
      const query = `
      SELECT encargos_financeiros.*, segmento.segmento AS segmento
      FROM encargos_financeiros
      INNER JOIN segmento ON encargos_financeiros.segmento_id = segmento.id
      WHERE encargos_financeiros.type = 'EXCECAO'
      AND encargos_financeiros.segmento_id = ?
      AND encargos_financeiros.product_group = ?
    `;

      return new Promise((resolve, reject) => {
         getConnection((err, con) => {
            if (err) {
               reject(`Erro ao obter conexão: ${err}`);
               return;
            }
            con.query(query, [filter.segmento_id, filter.product_group], (err, result) => {
               con.release();
               if (err) {
                  reject(err);
               } else {
                  if (result.length === 0) {
                     // Se não houver resultados, faça outra consulta
                     const defaultQuery = `
                SELECT * FROM encargos_financeiros
                WHERE type = 'PADRAO'
                AND product_group = ?
              `;
                     con.query(defaultQuery, [filter.product_group], (err, defaultResult) => {
                        con.release();
                        if (err) {
                           reject(err);
                        } else {
                           resolve(defaultResult[0]);
                        }
                     });
                  } else {
                     resolve(result[0]);
                  }
               }
            });
         });
      });
   } catch (error) {
      throw new Error(`Erro ao localizar encargo financeiro: ${error}`);
   }
};

module.exports = { getAll, getOne };
