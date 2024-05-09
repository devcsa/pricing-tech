const con = require("../config/connection");

const getAll = async () => {
   return new Promise((resolve, reject) => {
      con.query("SELECT * FROM type_user", (err, result) => {
         if (err) {
            reject(`Erro ao recuperar os dados: ${err}`);
         } else {
            resolve(result);
         }
      });
   });
};

module.exports = { getAll };
