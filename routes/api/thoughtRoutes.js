const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');

// /api/users
router.route('/')
  // get all users
  .get(getAllThoughts)
  // create a new user
  .post(createThought);

// /api/users/:userId
router.route('/:id')
  // get user by id
  .get(getThoughtById)
  // delete user by id
  .delete(deleteThought)
  // update user by id
  .put(updateThought);

module.exports = router;
