const bcrypt = require("bcrypt");
const { getUser } = require("../../controllers/useRegister");
const AppError = require("../../utils/AppError");
const {
  createToken,
  createRefreshToken,
} = require("../../controllers/jwtHandler");

const LoginMiddleware = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userInfo = await getUser(username);
    if (userInfo.length !== 0) {
      req.user = userInfo;
      req.password = password;
      next();
    } else {
      throw new AppError("INVALID USER", "User not found", 404);
    }
  } catch (error) {
    console.log("error occurred", error);
    return next(error);
  }
};
const PasswordVerify = async (req, res, next) => {
  try {
    const isValid = await bcrypt.compare(req.password, req.user[0].password);
    if (isValid) {
      next();
    } else {
      throw new AppError("NO VALID CREDENTIALS", "Wrong credentials", 401);
    }
  } catch (error) {
    return next(error);
  }
};
const generateToken = async (req, res, next) => {
  try {
    const accessToken = await createToken(req.user[0].username);
    const refreshToken = await createRefreshToken(req.user[0].username);
    req.token = { accessToken, refreshToken };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { LoginMiddleware, PasswordVerify, generateToken };
