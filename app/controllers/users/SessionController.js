const jwt = require("jsonwebtoken");
const userModel = require("../../models/users/userModel");

const authConfig = require("../../config/auth");

const loginUser = async (req, res) => {
   const { email, password } = req.body;

   const user = await userModel.loginUser(req.body);
   if (!user) {
      return res.status(401).json({ error: "Usuário ou senha inválidos!" });
   }

   // Verificar se a senha informada está correta
   if (!(await userModel.checkPassword(password, user.password))) {
      return res.status(401).json({ error: "Usuário ou senha inválidos!" });
   }

   const { id, username, user_photo, type_user_id } = user;

   const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
   });

   // Envia o token como parte da resposta
   res.json({ id: id, username: username, user_photo: user_photo, type_user_id: type_user_id, token: token });
};

const logout = async (req, res) => {
   try {
      delete req.headers["authorization"];
      return res.status(200).json({ message: "Logout realizado com sucesso" });
   } catch (error) {
      console.error("Erro durante o logout:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
   }
};

module.exports = { loginUser, logout };
