const bcrypt = require("bcrypt");
const { addUser } = require("../../controllers/useRegister");
const AppError = require("../../utils/AppError");
const {
  createToken,
  createRefreshToken,
} = require("../../controllers/jwtHandler");

const hashPassword = async (req, res, next) => {
  const { userid, name, username, password, DOB, bio, country } = req.body;
  try {
    if (!password) {
      throw new AppError(
        "MISSING HASH DATA",
        "data and salt arguments required",
        500
      );
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      req.hashedPassword = {
        userid,
        name,
        username,
        hashPassword,
        DOB,
        bio,
        country,
      };
      next();
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const addUserData = async (req, res, next) => {
  const data = req.hashedPassword;
  try {
    const result = await addUser({ data });
    const access_token = await createToken(req.hashedPassword.username);
    const refresh_token = await createRefreshToken(req.hashedPassword.username);
    req.data = { result, access_token, refresh_token };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { hashPassword, addUserData };
