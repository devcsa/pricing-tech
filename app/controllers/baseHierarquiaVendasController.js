const baseHierarquiaVendasModel = require("../models/baseHierarquiaVendasModel");

const getAll = async (req, res, next) => {
   try {
      const baseHierarquiaVendas = await baseHierarquiaVendasModel.getAll();
      return res.status(200).json(baseHierarquiaVendas);
   } catch (error) {
      next(error);
   }
};

module.exports = { getAll };
