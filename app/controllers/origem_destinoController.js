const origem_destinoModel = require("../../app/models/origem_destinoModel");

const getAll = async (req, res) => {
   const origem_destino = await origem_destinoModel.getAll();

   const data = origem_destino.map((result) => ({
      id: result.id,
      origem: result.origem,
      destino: result.destino,
      origem_destino: result.origem + " / " + result.destino,
   }));

   return res.status(200).json(data);
};

module.exports = { getAll };
