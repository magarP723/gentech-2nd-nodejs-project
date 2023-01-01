const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index.routes");
const errorHandler = require("./middlewares/errorController");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
global.__basedir = __dirname;

app.use("/api", indexRouter); //main api handler

app.all("*", (req, res) => {
  res.status(404).json({
    status: "failure",
    message: "This route does not exists on server.",
  });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
