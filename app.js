const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("express-async-errors");
require("dotenv").config();
body_parser = require("body-parser");
request = require("request");

const auth = require("./middlewares/auth.mdw");
const handlerError = require("./middlewares/error-response.mdw");
const AppError = require("./utils/appError");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", function (req, res) {
  res.json({
    message: "Hello world!",
  });
});

app.use(body_parser.json());

//API
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/question-category", auth, require("./routes/question-category.route"));
app.use("/api/question", auth, require("./routes/question.route"));
app.use("/api/answer", auth, require("./routes/answer.route"));

app.use("/api/udpt", auth, require("./routes/udpt.route"));


// handle undefined Routes
app.use("*", (req, res, next) => {
  const err = new AppError(404, "undefined route");
  next(err);
});

app.use(handlerError);

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Back-end api is running at http://localhost:${PORT}`);
});
