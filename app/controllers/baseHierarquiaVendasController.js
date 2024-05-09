const baseHierarquiaVendasModel = require("../models/baseHierarquiaVendasModel");

const getAll = async (req, res) => {
   const baseHierarquiaVendas = await baseHierarquiaVendasModel.getAll();
   return res.status(200).json(baseHierarquiaVendas);
};

module.exports = { getAll };
