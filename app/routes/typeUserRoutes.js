const express = require("express");

const typeUserRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const typeUserController = require("../controllers/typeUserController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
typeUserRoutes.use(authMiddleware);

typeUserRoutes.get("/typeUser_All", typeUserController.getAll);

module.exports = typeUserRoutes;
