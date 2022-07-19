const userRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/userControllers');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUser,
);
userRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .regex(/https?:\/\/(www.)?[\w\\-_~:/?#@!$&'*,;=]+\.\w+/),
    }),
  }),
  updateAvatar,
);

userRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  getUser,
);

module.exports = userRouter;
