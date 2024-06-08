const { getConnection } = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         connection.query(
            "SELECT settings_prices.*, discounts.discount_name AS discount_name FROM settings_prices INNER JOIN discounts ON settings_prices.discount_id = discounts.id",
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

const getOne = async (settings_prices) => {
   return new Promise((resolve, reject) => {
      getConnection((err, connection) => {
         if (err) {
            reject(`Erro ao obter conexão: ${err}`);
            return;
         }
         connection.query(
            `SELECT settings_prices.*, discounts.discount_name AS discount_name FROM settings_prices INNER JOIN discounts ON settings_prices.discount_id = discounts.id WHERE settings_prices.price_name = ${settings_prices.price_name}`,
            (err, result) => {
               connection.release();
               if (err) {
                  reject(`Erro ao localizar parametrização de preço: ${err}`);
               } else {
                  resolve(result[0]);
               }
            }
         );
      }).catch((error) => {
         throw new Error(`Erro ao localizar parametrização de preço: ${error}`);
      });
   });
};

module.exports = { getAll, getOne };
