const express = require("express");
require("express-async-errors");
const cors = require("cors");
const PORT = 3002;
const indexRouter = require("./routes/index.routes");
const errorHandler = require("./middlewares/errorController");
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", indexRouter); //main api handler

app.all("*", (req, res) => {
  res.status(404).json({
    status: "failure",
    message: "This route does not exists on server.",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
