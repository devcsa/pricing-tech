const baseFormatoLojaModel = require("../models/baseFormatoLojaModel");

const getAll = async (req, res) => {
   const baseFormatoLoja = await baseFormatoLojaModel.getAll();
   return res.status(200).json(baseFormatoLoja);
};

module.exports = { getAll };
