const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
} = require('../../controllers/userController');

// /api/users
router.route('/')
  // get all users
  .get(getUsers)
  // create a new user
  .post(createUser);

// /api/users/:userId
router.route('/:userId')
  // get user by id
  .get(getUserById)
  // delete user by id
  .delete(deleteUser)
  // update user by id
  .put(updateUser);

module.exports = router;
