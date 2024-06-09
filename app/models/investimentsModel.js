const { getConnection } = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         connection.query(
            "SELECT discounts.discount_type AS discount_type, investiments.cva as cva, produtos.produto AS produto, segmento.segmento AS segmento, micro_regiao.micro_regiao AS micro_regiao, SUM(investiments.pct_discount) AS pct_total FROM investiments INNER JOIN discounts ON investiments.discount_id = discounts.id INNER JOIN produtos ON investiments.produto_id = produtos.id INNER JOIN segmento ON investiments.segmento_id = segmento.id INNER JOIN micro_regiao ON investiments.micro_regiao_id = micro_regiao.id INNER JOIN settings_prices ON discounts.id = settings_prices.discount_id GROUP BY discounts.discount_type, produtos.produto, segmento.segmento, investiments.cva, micro_regiao.micro_regiao",
            (err, result) => {
               connection.release();
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

const getOne = async (simulation) => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         connection.query(
            `SELECT discounts.discount_type AS discount_type, investiments.cva as cva, produtos.produto AS produto, segmento.segmento AS segmento, micro_regiao.micro_regiao AS micro_regiao, SUM(investiments.pct_discount) AS pct_total FROM investiments INNER JOIN discounts ON investiments.discount_id = discounts.id INNER JOIN produtos ON investiments.produto_id = produtos.id INNER JOIN segmento ON investiments.segmento_id = segmento.id INNER JOIN micro_regiao ON investiments.micro_regiao_id = micro_regiao.id INNER JOIN settings_prices ON discounts.id = settings_prices.discount_id WHERE settings_prices.price_name = '${simulation.price_name}' AND produtos.id = ${simulation.produto_id} AND segmento.id = ${simulation.segmento_id} AND micro_regiao.id = ${simulation.micro_regiao_id} GROUP BY discounts.discount_type, produtos.produto, segmento.segmento, investiments.cva, micro_regiao.micro_regiao`,
            (err, result) => {
               connection.release();
               if (err) {
                  reject(`Erro ao localizar descontos: ${err}`);
               } else {
                  resolve(result);
               }
            }
         );
      });
   });
};

const getCva = async (simulation) => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         connection.query(
            `SELECT discounts.discount_type AS discount_type, investiments.cva as cva, produtos.produto AS produto, segmento.segmento AS segmento, micro_regiao.micro_regiao AS micro_regiao, SUM(investiments.pct_discount) AS pct_total FROM investiments INNER JOIN discounts ON investiments.discount_id = discounts.id INNER JOIN produtos ON investiments.produto_id = produtos.id INNER JOIN segmento ON investiments.segmento_id = segmento.id INNER JOIN micro_regiao ON investiments.micro_regiao_id = micro_regiao.id INNER JOIN settings_prices ON discounts.id = settings_prices.discount_id WHERE settings_prices.price_name = '${simulation.price_name}' AND produtos.cod_produto = '${simulation.produto}' AND segmento = '${simulation.segmento}' AND micro_regiao.micro_regiao = '${simulation.micro_regiao}' AND investiments.cva = '${simulation.cva}' GROUP BY discounts.discount_type, produtos.produto, segmento.segmento, investiments.cva, micro_regiao.micro_regiao`,
            (err, result) => {
               connection.release();
               if (err) {
                  reject(`Erro ao localizar descontos: ${err}`);
               } else {
                  resolve(result);
               }
            }
         );
      });
   });
};

module.exports = { getAll, getOne, getCva };
