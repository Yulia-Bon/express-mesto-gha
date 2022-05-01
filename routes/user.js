const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  userAvatarValid,
  parameterIdValid,
  userValid,
} = require('../middlewares/validationJoi');
const {
  getUsers,
  getUserId,
  createUser,
  getUserMe,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUserMe);
router.get('/users/:userId', auth, parameterIdValid('userId'), getUserId);
router.post('/users', auth, createUser);
router.patch('/users/me', auth, userValid, updateUserInfo);
router.patch('/users/me/avatar', userAvatarValid, updateAvatar);

module.exports = router;
