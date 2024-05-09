const express = require("express");

const microRegiaoRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const microRegiaoController = require("../controllers/microRegiaoController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
microRegiaoRoutes.use(authMiddleware);

// users
microRegiaoRoutes.get("/microRegiao/:id", microRegiaoController.getOne);
microRegiaoRoutes.get("/microRegiao_All", microRegiaoController.getAll);

module.exports = microRegiaoRoutes;
