const express = require("express");

const rotasRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const rotasController = require("../controllers/rotasController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
rotasRoutes.use(authMiddleware);

rotasRoutes.get("/rotas", rotasController.getOne);
rotasRoutes.get("/rotas_All", rotasController.getAll);

module.exports = rotasRoutes;
