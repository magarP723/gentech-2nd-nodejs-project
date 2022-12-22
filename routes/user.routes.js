const express = require("express");
const userAPI = express.Router();
const { getAll } = require("../controllers/useRegister");
const {
  LoginMiddleware,
  PasswordVerify,
  generateToken,
} = require("../middlewares/login/LoginMiddleware");
const {
  hashPassword,
  addUserData,
} = require("../middlewares/register/RegisterMiddleware");
const { success } = require("../utils/responseMessage");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");

userAPI.get("/", AuthMiddleware, async (req, res) => {
  try {
    const users = await getAll();
    res.status(200).json(success(users));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

userAPI.post(
  "/login",
  LoginMiddleware,
  PasswordVerify,
  generateToken,
  (req, res) => {
    const data = {
      access_token: req.token.accessToken,
      refresh_token: req.token.refreshToken,
      role: "user",
    };
    res.status(200).json(success(data));
  }
);

userAPI.post("/register", hashPassword, addUserData, (req, res) => {
  res.status(200).json(success(req.data));
});

module.exports = userAPI;
