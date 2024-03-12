const router = require('express').Router();
// const {
//   getUsers,
//   getSingleUser,
//   createUser,
// } = require('../../controllers/userController');

// /api/users
// router.route('/').get(getUsers).post(createUser);

// setting up test route to see if server is working
// /api/users
router.route('/').get((req, res) => {
  res.send('Hello World');
});

// /api/users/:userId
// router.route('/:userId').get(getSingleUser);

module.exports = router;
