const fs = require("fs").promises;
const baseFormatoLoja_DB = require("../config/db_baseFormatoLoja");

const getAll = async () => {
   const baseFormatoLoja = await fs.readFile(baseFormatoLoja_DB, "utf-8");
   const dadosFormatoLoja = JSON.parse(baseFormatoLoja);

   return dadosFormatoLoja;
};

module.exports = { getAll };
