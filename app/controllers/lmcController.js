const lmcModel = require("../models/lmcModel");

const getAll = async (req, res) => {
   const lmc = await lmcModel.getAll();
   return res.status(200).json(lmc);
};

module.exports = { getAll };
