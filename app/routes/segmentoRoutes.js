const express = require("express");

const segmentoRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const segmentoController = require("../controllers/segmentoController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
segmentoRoutes.use(authMiddleware);

// users
segmentoRoutes.get("/segmento", segmentoController.getOne);
segmentoRoutes.get("/segmento_All", segmentoController.getAll);

module.exports = segmentoRoutes;
