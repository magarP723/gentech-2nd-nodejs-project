const express = require("express");
const userAPI = express.Router();
const { getAll, addRefreshToken } = require("../controllers/useRegister");
const {
  LoginMiddleware,
  PasswordVerify,
  generateToken,
  logout,
} = require("../middlewares/login/LoginMiddleware");
const {
  hashPassword,
  addUserData,
} = require("../middlewares/register/RegisterMiddleware");
const { success } = require("../utils/responseMessage");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");
const {
  sessionVerification,
  checkIfTokenExpired,
} = require("../middlewares/sessionVerification");

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
  async (req, res) => {
    const data = {
      ...req.userInfo[0],
      access_token: req.token.accessToken,
      refresh_token: req.token.refreshToken,
    };
    console.log(data);
    await addRefreshToken(data.refresh_token); //add refresh token in db.
    res.cookie("userCredentials", JSON.stringify(data));
    res.status(200).json(success(data));
  }
);

userAPI.post("/register", hashPassword, addUserData, (req, res) => {
  res.status(200).json(success(req.data));
});

userAPI.get("/verifysession", sessionVerification, checkIfTokenExpired);

userAPI.get("/logout", logout, (req, res) => {
  res.status(200).json(success("logout success."));
});

module.exports = userAPI;
