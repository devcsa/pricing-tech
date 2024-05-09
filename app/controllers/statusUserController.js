const statusUserModel = require("../../app/models/statusUserModel");

const getAll = async (req, res) => {
   const statusUser = await statusUserModel.getAll();

   const data = statusUser.map((status) => ({
      id: status.id,
      status: status.status,
   }));

   return res.status(200).json(data);
};

module.exports = { getAll };
