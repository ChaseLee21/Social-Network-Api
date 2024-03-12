const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  // get all thoughts
  .get(getAllThoughts)
  // create a new thoughts
  .post(createThought);

// /api/thoughts/:id
router.route('/:id')
  // get thought by id
  .get(getThoughtById)
  // delete thought by id
  .delete(deleteThought)
  // update thought by id
  .put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  // add reaction to thought
  .post(addReaction);

// /api/thoughts/:id/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  // remove reaction from thought
  .delete(removeReaction);

module.exports = router;
