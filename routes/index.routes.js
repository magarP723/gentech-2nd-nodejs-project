const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const dataAPI = require("./data.routes");

router.use("/users", userRoutes);
router.use("/getdata", dataAPI);

module.exports = router;
