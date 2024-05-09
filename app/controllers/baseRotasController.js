const baseRotasModel = require("../models/baseRotasModel");

const getOne = async (req, res) => {
   const category = req.params.categoria;
   const baseRotas = await baseRotasModel.getOne(category);
   return res.status(200).json(baseRotas);
};

module.exports = { getOne };
