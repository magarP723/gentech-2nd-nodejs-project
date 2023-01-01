const { verifyToken } = require("../controllers/jwtHandler");
const AuthMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header.split(" ")[1];
  try {
    await verifyToken(token);
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { AuthMiddleware };
