const bcrypt = require("bcrypt");
const {
  getUser,
  deleteRefreshTOken,
} = require("../../controllers/useRegister");
const AppError = require("../../utils/AppError");
const {
  createToken,
  createRefreshToken,
} = require("../../controllers/jwtHandler");

const LoginMiddleware = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(password, username);
  try {
    const userInfo = await getUser(username);
    if (userInfo.length !== 0) {
      req.userInfo = userInfo;
      req.password = password;
      return next();
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
    const isValid = await bcrypt.compare(
      req.password,
      req.userInfo[0].password
    );
    if (isValid) {
      return next();
    }
    throw new AppError("NO VALID CREDENTIALS", "Wrong credentials", 401);
  } catch (error) {
    return next(error);
  }
};
const generateToken = async (req, res, next) => {
  try {
    const accessToken = await createToken(req.userInfo[0]);
    const refreshToken = await createRefreshToken(req.userInfo[0].username);
    req.token = { accessToken, refreshToken };
    return next();
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { refresh_token } = JSON.parse(req.cookies.userCredentials);
  try {
    const result = await deleteRefreshTOken(refresh_token);
    res.clearCookie("userCredentials");
    next();
    return { result };
  } catch (error) {
    next(error);
  }
};

module.exports = { LoginMiddleware, PasswordVerify, generateToken, logout };
