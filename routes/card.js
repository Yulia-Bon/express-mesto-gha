const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createCardValid,
  parameterIdValid,
} = require('../middlewares/validationJoi');
const {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/cards', auth, createCardValid, createCard);
router.delete('/cards/:cardId', auth, parameterIdValid('cardId'), deleteCard);
router.put('/cards/:cardId/likes', auth, parameterIdValid('cardId'), likeCard);
router.delete('/cards/:cardId/likes', auth, parameterIdValid('cardId'), dislikeCard);

module.exports = router;
