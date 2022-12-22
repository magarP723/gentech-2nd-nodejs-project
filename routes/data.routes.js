const express = require("express");
const dataAPI = express.Router();
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");

dataAPI.get("/", AuthMiddleware, (req, res, next) => {
  res.status(200).json({ data: "No data at all" });
});

module.exports = dataAPI;
