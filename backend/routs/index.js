const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { login, addUser } = require('../controllers/userControllers');
const cardsRouter = require('./cardsRouter');
const userRouter = require('./userRouter');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

/* LOGIN */
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

/* ADD USER */
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(
        /https?:\/\/(www.)?[\w\\-_~:/?#@!$&'*,;=]+\.\w+/,
      ),
    }),
  }),
  addUser,
);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use(() => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
