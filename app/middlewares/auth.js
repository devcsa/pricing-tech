const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const authConfig = require("../config/auth");

const middlewareAuth = async (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      return res.status(401).json({ error: "Token não existe!" });
   }

   const [, token] = authHeader.split(" ");

   try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      req.userId = decoded.id;

      return next();
   } catch (err) {
      return res.status(401).json({ error: "Token invalido." });
   }
};

module.exports = middlewareAuth;
