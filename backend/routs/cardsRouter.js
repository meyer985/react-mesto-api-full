const cardsRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cardsControllers');

cardsRouter.get('/', getCards);

cardsRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(/https?:\/\/(www.)?\w+.\w+.[\w\-_~:/?#\]@!$&'*,;=]*/),
    }),
  }),
  postCard,
);

cardsRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  deleteCard,
);

cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  putLike,
);

cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  deleteLike,
);

module.exports = cardsRouter;
