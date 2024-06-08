const express = require("express");

const investimentsRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const investimentsController = require("../controllers/investimentsController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
investimentsRoutes.use(authMiddleware);

investimentsRoutes.get("/investiments", investimentsController.getOne);
investimentsRoutes.get("/investiments_All", investimentsController.getAll);

module.exports = investimentsRoutes;
