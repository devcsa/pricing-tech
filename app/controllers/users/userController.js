const userModel = require("../../models/users/userModel");

const getAll = async (req, res) => {
   const users = await userModel.getAll();

   const userData = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      user_photo: user.user_photo,
      phone_number: user.phone_number,
      status_user: user.status_user,
      type_user: user.type_user,
      created_at: user.created_at,
      updated_at: user.updated_at,
   }));

   return res.status(200).json(userData);
};

const getOne = async (req, res) => {
   const { id } = req.params;

   const user = await userModel.getOne(id);
   const { username, email, user_photo, phone_number, status_user, type_user, created_at, updated_at } = user;
   const userData = { username, email, user_photo, phone_number, status_user, type_user, created_at, updated_at };
   return res.status(200).json(userData);
};

const addUser = async (req, res) => {
   const user = await userModel.addUser(req.body);

   if (user.error == "Email já está em uso!") {
      return res.status(400).json(user);
   } else {
      return res.status(200).json(user);
   }
};

const deleteUser = async (req, res) => {
   const { id } = req.params;

   const user = await userModel.deleteUser(id);
   return res.status(200).json(user);
};

const updateUser = async (req, res) => {
   const { id } = req.params;

   const user = await userModel.updateUser(id, req.body);

   if (user.error == "Email já está em uso!") {
      return res.status(400).json(user);
   } else {
      return res.status(200).json(user);
   }
};

const updatePassword = async (req, res) => {
   const { id } = req.params;

   const user = await userModel.updatePassword(id, req.body);

   return res.status(200).json(user);
};

const updatePhoto = async (req, res) => {
   const { id } = req.params;

   // console.log(`ID: ${id}`);
   // console.log(`req.body: ${req.body}`);
   // console.log(`req.params: ${req.params}`);

   const user_photo = await userModel.updatePhoto(id, req.body);

   return res.status(200).json(user_photo);
};

module.exports = {
   getAll,
   addUser,
   deleteUser,
   updateUser,
   getOne,
   updatePassword,
   updatePhoto,
};
