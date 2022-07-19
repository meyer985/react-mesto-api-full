const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { SERVER_ERROR } = require("./utils/errorCodes");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const router = require("./routs/index");
require("dotenv").config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  autoIndex: true,
});

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://front15meyer985.nomoredomains.xyz",
    "http://www.front15meyer985.nomoredomains.xyz",
    "https://front15meyer985.nomoredomains.xyz",
    "https://www.front15meyer985.nomoredomains.xyz",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

/* КРАШ-ТЕСТ */
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR ? "Ошибка сервера" : message,
  });

  next();
});

app.listen(PORT, () => console.log(`App is working on port${PORT}`));
