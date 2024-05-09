const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs").promises;

const uploadUserPhotoRoutes = express.Router();
const authMiddleware = require("../middlewares/auth");

uploadUserPhotoRoutes.use(cors());
uploadUserPhotoRoutes.use(authMiddleware);

const storage = multer.diskStorage({
   destination: function (req, file, callback) {
      callback(null, __dirname + "/../uploads/users");
   },

   filename: function (req, file, callback) {
      const userId = req.params.id || "unknown"; // Use 'unknown' se o ID do usuário não estiver disponível
      const mimeType = file.mimetype;
      const extension = mimeType.split("/")[1];

      // var fileName = `${userId}-${file.originalname}`;
      var fileName = `photo_user-${userId}.${extension}`;

      callback(null, fileName);
      // callback(null, file.originalname);
   },
});

const uploads = multer({ storage: storage });

uploadUserPhotoRoutes.post("/uploadUserPhoto/:id", uploads.array("files"), (req, res) => {
   const uploadedFiles = req.files.map((file) => file.filename);
   return res.json({ message: "Upload realizado com sucesso!", files: uploadedFiles });
});

uploadUserPhotoRoutes.delete("/deleteUserPhoto/:id/:filename", async (req, res) => {
   const userId = req.params.id;
   const filename = req.params.filename;

   try {
      // Verifica se o arquivo existe
      await fs.access(`./app/uploads/users/${filename}`);

      // Remove o arquivo
      await fs.unlink(`./app/uploads/users/${filename}`);

      res.json({ message: "Foto do usuário excluída com sucesso!" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir a foto do usuário" });
   }
});

module.exports = uploadUserPhotoRoutes;
