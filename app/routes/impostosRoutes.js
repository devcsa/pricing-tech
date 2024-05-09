const express = require("express");

const impostosRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const impostosController = require("../controllers/impostosController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
impostosRoutes.use(authMiddleware);

impostosRoutes.get("/impostos", impostosController.getOne);
impostosRoutes.get("/impostos_All", impostosController.getAll);

module.exports = impostosRoutes;
