const express = require("express");

const origem_destinoRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const origem_destinoController = require("../controllers/origem_destinoController.js");

// Todas origem_destino abaixo desse middleware precisa estar autenticado
origem_destinoRoutes.use(authMiddleware);

origem_destinoRoutes.get("/origem_destino_All", origem_destinoController.getAll);

module.exports = origem_destinoRoutes;
