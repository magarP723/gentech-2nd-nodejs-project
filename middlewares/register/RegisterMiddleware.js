const bcrypt = require("bcrypt");
const { addUser } = require("../../controllers/useRegister");
const AppError = require("../../utils/AppError");

const hashPassword = async (req, res, next) => {
  const { name, username, password, DOB, bio, country } = req.body;
  try {
    if (!password || !username || !name) {
      throw new AppError(
        "MISSING  DATA",
        "data and salt arguments required",
        500
      );
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      req.hashedPassword = {
        name,
        username,
        hashPassword,
        DOB,
        bio,
        country,
      };
      return next();
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
    req.data = { result };
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { hashPassword, addUserData };
