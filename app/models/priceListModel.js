const con = require("../config/connection");

// const getAll = async () => {
//    return new Promise((resolve, reject) => {
//       con.query(
//          "SELECT margem_markup.*, micro_regiao.micro_regiao AS micro_regiao, segmento.segmento AS segmento, produtos.produto AS produto FROM margem_markup INNER JOIN micro_regiao ON margem_markup.micro_regiao_id = micro_regiao.id INNER JOIN segmento ON margem_markup.segmento_id = segmento.id INNER JOIN produtos ON margem_markup.produto_id = produtos.id",
//          (err, result) => {
//             if (err) {
//                reject(`Erro ao recuperar os dados: ${err}`);
//             } else {
//                resolve(result);
//             }
//          }
//       );
//    });
// };

const getOne = async (id) => {
   return new Promise((resolve, reject) => {
      con.query(
         `SELECT price_list.*, produtos.produto AS produto, produtos.unidades_caixa AS unidades_caixa FROM price_list INNER JOIN produtos ON price_list.produto_id = produtos.id WHERE price_list.produto_id = ${id}`,
         (err, result) => {
            if (err) {
               reject(`Erro ao localizar produto: ${err}`);
            } else {
               resolve(result[0]);
            }
         }
      );
   }).catch((error) => {
      throw new Error(`Erro ao localizar produto: ${error}`);
   });
};

module.exports = { getOne };
