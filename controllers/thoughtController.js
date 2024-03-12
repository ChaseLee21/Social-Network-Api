const { Thought, User } = require('../models/index');

// Get all thoughts
const getAllThoughts = (req, res) => {
    Thought.find({})
        .then((thoughts) => {
            res.json(thoughts);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

// Get a single thought by id
const getThoughtById = (req, res) => {
    Thought.findOne({ _id: req.params.id })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

// Create a new thought
const createThought = (req, res) => {
    Thought.create(req.body)
        .then((thought) => {
            console.log(thought);
            User.findOneAndUpdate(
                { username: thought.username },
                { $push: { thoughts: thought._id } },
                { new: true }
                )
                .then((user) => {
                    console.log(user);
                    if (!user) {
                        res.status(404).json({ message: 'Cannot create thought no user with that username was found' });
                        return;
                    }
                    res.json(thought);
                })
                .catch((err) => {
                    res.json(err);
                });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

// Update a thought by id
const updateThought = (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

// Delete a thought by id
const deleteThought = (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.id })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

// Add a reaction to a thought
const addReaction = (req, res) => {
    Thought.create(req.body)
        .then((thought) => {
                Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $push: { reactions: thought._id } },
                    { new: true }
                    )
                    .then((thought) => {
                        if (!thought) {
                            res.status(404).json({ message: 'No thought found with this id!' });
                            return;
                        }
                        res.json(thought);
                    })
                    .catch((err) => {
                        res.status(400).json(err);
                    });
        })
}

// Remove a reaction from a thought
const removeReaction = (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
    )
    .then((thought) => {
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
}

module.exports = 
{
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
};