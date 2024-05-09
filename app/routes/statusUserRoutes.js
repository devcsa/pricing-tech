const express = require("express");

const statusUserRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const statusUserController = require("../controllers/statusUserController.js");

// Todas rotas abaixo desse middleware precisa estar autenticado
statusUserRoutes.use(authMiddleware);

statusUserRoutes.get("/statusUser_All", statusUserController.getAll);

module.exports = statusUserRoutes;
