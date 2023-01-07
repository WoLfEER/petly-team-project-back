const fs = require("fs");
const path = require("path");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config();

//* logger-file /public/server.log
const accessLogStream = fs.createWriteStream(
  path.join(__dirname.split("routes")[0], "./static/server.log"),
  { flags: "a" }
);

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

//   routes
const newsRouter = require("./routes/api/news");
const authRouter = require("./routes/api/auth");
const friendsRouter = require("./routes/api/friends");
const noticeRouter = require("./routes/api/notices");
const userRouter = require("./routes/api/user");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());
app.use(express.json());
app.use(express.static("static"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// middleware

app.use("/api/auth", authRouter);
app.use("/api/news", newsRouter);

app.use("/api/friends", friendsRouter);
app.use("/api/notices", noticeRouter);
app.use("/api/user", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
