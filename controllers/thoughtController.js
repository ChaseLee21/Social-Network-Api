const Thought = require('../models/Thought');

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then((thoughts) => {
                res.json(thoughts);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    // Get a single thought by id
    getThoughtById(req, res) {
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
    },

    // Create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                res.json(thought);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    // Update a thought by id
    updateThought(req, res) {
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
    },

    // Delete a thought by id
    deleteThought(req, res) {
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
    },
};

module.exports = thoughtController;