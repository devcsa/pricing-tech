const express = require("express");
const userRoutes = express.Router();

const authMiddleware = require("../middlewares/auth");

const userController = require("../controllers/users/userController");
const SessionController = require("../controllers/users/SessionController.js");

userRoutes.post("/login", SessionController.loginUser);
userRoutes.post("/users", userController.addUser);

// Todas rotas abaixo desse middleware precisa estar autenticado
userRoutes.use(authMiddleware);

userRoutes.get("/users/:id", userController.getOne);
userRoutes.get("/users", userController.getAll);
userRoutes.put("/users/:id", userController.updateUser);
userRoutes.put("/userPassword/:id", userController.updatePassword);
userRoutes.delete("/users/:id", userController.deleteUser);
userRoutes.post("/logout", SessionController.logout);
userRoutes.put("/userPhoto/:id", userController.updatePhoto);

module.exports = userRoutes;
