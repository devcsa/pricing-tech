const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query("SELECT settings_prices.*, discounts.discount_name AS discount_name FROM settings_prices INNER JOIN discounts ON settings_prices.discount_id = discounts.id", (err, result) => {
         if (err) {
            reject(`Erro ao recuperar os dados: ${err}`);
         } else {
            resolve(result);
         }
      });
   });
};

const getOne = async (settings_prices) => {
   return new Promise((resolve, reject) => {
      con.query(
         `SELECT settings_prices.*, discounts.discount_name AS discount_name FROM settings_prices INNER JOIN discounts ON settings_prices.discount_id = discounts.id WHERE settings_prices.price_name = ${settings_prices.price_name}`,
         (err, result) => {
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
};

module.exports = { getAll, getOne };
