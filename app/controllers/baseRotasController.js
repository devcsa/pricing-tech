const baseRotasModel = require("../models/baseRotasModel");

const getOne = async (req, res, next) => {
   try {
      const category = req.params.categoria;
      const baseRotas = await baseRotasModel.getOne(category);
      return res.status(200).json(baseRotas);
   } catch (error) {
      next(error);
   }
};

module.exports = { getOne };
