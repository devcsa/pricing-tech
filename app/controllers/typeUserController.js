const typeUserModel = require("../../app/models/typeUserModel");

const getAll = async (req, res) => {
   const typeUser = await typeUserModel.getAll();

   const data = typeUser.map((typeUser) => ({
      id: typeUser.id,
      type_user: typeUser.type_user,
   }));

   return res.status(200).json(data);
};

module.exports = { getAll };
