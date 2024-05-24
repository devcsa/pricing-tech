const express = require("express");

const regimesRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const regimesController = require("../controllers/regimesController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
regimesRoutes.use(authMiddleware);

regimesRoutes.get("/regimes", regimesController.getOne);
regimesRoutes.get("/regimes_All", regimesController.getAll);
regimesRoutes.get("/regimes/:id", regimesController.findOne);
regimesRoutes.put("/regimes/:id", regimesController.updateRegimes);

module.exports = regimesRoutes;
