const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserData,
} = require('../controllers/users');

router.get('/:_id', getUserById);
router.get('/', getUsers);
// router.post('/', createUser);
router.get('/me', getUserData);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
