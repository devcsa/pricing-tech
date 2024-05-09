const rotasModel = require("../../app/models/rotasModel");

const getAll = async (req, res) => {
   const rotas = await rotasModel.getAll();

   const data = rotas.map((rotas) => ({
      id: rotas.id,
      micro_regiao: rotas.micro_regiao,
      segmento: rotas.segmento,
      origem_destino: rotas.origem_destino,
      commodity: rotas.commodity,
      category: rotas.category,
      produto: rotas.produto,
      type: rotas.type,
   }));

   return res.status(200).json(data);
};

const getOne = async (req, res) => {
   const filter = req.query;
   const rotas = await rotasModel.getOne(filter);

   if (rotas == undefined) {
      return res.status(404).json({ error: "Rota não encontrada!" });
   } else {
      return res.status(200).json(rotas);
   }
};

module.exports = { getAll, getOne };
