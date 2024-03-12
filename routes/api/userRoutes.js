const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/userController');

// /api/users
router.route('/')
  // get all users
  .get(getUsers)
  // create a new user
  .post(createUser);

// /api/users/:userId
router.route('/:id')
  // get user by id
  .get(getUserById)
  // delete user by id
  .delete(deleteUser)
  // update user by id
  .put(updateUser);

router.route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
