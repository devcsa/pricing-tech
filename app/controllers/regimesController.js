const regimesModel = require("../../app/models/regimesModel");

const getAll = async (req, res) => {
   const regimes = await regimesModel.getAll();

   return res.status(200).json(regimes);
};

const getOne = async (req, res) => {
   const filter = req.query;
   const regimes = await regimesModel.getOne(filter);

   if (regimes == undefined) {
      return res.status(404).json({ error: "regimes não encontrados!" });
   } else {
      return res.status(200).json(regimes);
   }
};

module.exports = { getAll, getOne };
