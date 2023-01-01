const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const songAPI = require("./song.routes");

router.use("/users", userRoutes);
router.use("/songs", songAPI);

module.exports = router;
