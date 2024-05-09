const fs = require("fs").promises;
const lmc_DB = require("../config/db_lmc");

const getAll = async () => {
   const lmc = await fs.readFile(lmc_DB, "utf-8");
   const data = JSON.parse(lmc);

   return data;
};

module.exports = { getAll };
