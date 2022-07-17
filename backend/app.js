const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");
const cookieParser = require("cookie-parser");
const userRouter = require("./routs/userRouter");
const cardsRouter = require("./routs/cardsRouter");
const { login, addUser } = require("./controllers/userControllers");
const { auth } = require("./middlewares/auth");
const {
  CONFLICT_REQUEST,
  BAD_REQUEST_STATUS,
  SERVER_ERROR,
} = require("./utils/errorCodes");
const NotFoundError = require("./utils/errors/NotFoundError");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { corsHandler } = require("./middlewares/corsHandler");

const { PORT = 3000 } = process.env;

const app = express();
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(corsHandler);
app.use(requestLogger);

/* LOGIN */
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

/* ADD USER */
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(
        /https?:\/\/(www.)?\w+.\w+.[\w\-_~:/?#@!$&'*,;=]*/
      ),
    }),
  }),
  addUser
);

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use(errorLogger);

app.use(() => {
  throw new NotFoundError("Страница не найдена");
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    res
      .status(BAD_REQUEST_STATUS)
      .send({ message: "Переданы некорректные данные пользователя" });
  } else if (err.code === 11000) {
    res
      .status(CONFLICT_REQUEST)
      .send({ message: "Указанный email уже зарегистрирован" });
  } else {
    const { statusCode = SERVER_ERROR, message } = err;
    res
      .status(statusCode)
      .send({
        message: statusCode === SERVER_ERROR ? "Ошибка сервера" : message,
      });
  }
  next();
});

app.listen(PORT, () => console.log("App is working..."));
