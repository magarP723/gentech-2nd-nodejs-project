const express = require("express");
const songAPI = express.Router();
const { getDuration } = require("../middlewares/songs/durationMP3");
const { upload, addSong } = require("../middlewares/songs/songUpload");
const { AuthMiddleware } = require("../middlewares/AuthMiddleware");

songAPI.get("/", AuthMiddleware, (req, res, next) => {
  res.status(200).json({ data: "No data at all" });
});

songAPI.post("/upload", upload, getDuration, addSong);

module.exports = songAPI;

/*POST: /api/songs/upload */
