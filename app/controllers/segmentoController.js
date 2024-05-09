const segmentoModel = require("../../app/models/segmentoModel");

const getAll = async (req, res) => {
   const segmento = await segmentoModel.getAll();

   const data = segmento.map((segmento) => ({
      id: segmento.id,
      cod_segmento: segmento.cod_segmento,
      segmento: segmento.segmento,
   }));

   return res.status(200).json(data);
};

const getOne = async (req, res) => {
   const { id } = req.params;

   const segmentos = await segmentoModel.getOne(id);
   const { cod_segmento, segmento } = segmentos;
   const data = { cod_segmento, segmento };
   return res.status(200).json(data);
};

module.exports = { getAll, getOne };
