const impostosModel = require("../../app/models/impostosModel");

const getAll = async (req, res) => {
   const impostos = await impostosModel.getAll();

   return res.status(200).json(impostos);
};

const getOne = async (req, res) => {
   const filter = req.query;
   const impostos = await impostosModel.getOne(filter);

   if (impostos == undefined) {
      return res.status(404).json({ error: "Impostos não encontrados!" });
   } else {
      return res.status(200).json(impostos);
   }
};

module.exports = { getAll, getOne };
