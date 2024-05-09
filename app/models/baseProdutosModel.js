const fs = require("fs").promises;
const baseProdutos_DB = require("../config/db_baseProdutos");

const getAll = async () => {
   const baseProdutos = await fs.readFile(baseProdutos_DB, "utf-8");
   const dadosProdutos = JSON.parse(baseProdutos);

   return dadosProdutos;
};

module.exports = { getAll };
