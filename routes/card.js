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
  getCards,
} = require('../controllers/cards');

router.post('/cards', auth, createCardValid, createCard);
router.delete('/cards/:cardId', auth, parameterIdValid('cardId'), deleteCard);
router.put('/cards/:cardId/likes', auth, parameterIdValid('cardId'), likeCard);
router.delete('/cards/:cardId/likes', auth, parameterIdValid('cardId'), dislikeCard);
router.get('/cards', auth, getCards);

module.exports = router;
