const investimentsModel = require("../../app/models/investimentsModel");

const getAll = async (req, res) => {
   const investiments = await investimentsModel.getAll();

   return res.status(200).json(investiments);
};

const getOne = async (req, res) => {
   const filter = req.query;
   const investiments = await investimentsModel.getOne(filter);

   if (investiments == undefined) {
      return res.status(404).json({ error: "Descontos não encontrados!" });
   } else {
      return res.status(200).json(investiments);
   }
};

module.exports = { getAll, getOne };
