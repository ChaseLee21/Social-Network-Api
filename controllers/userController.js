const User = require('../models/User');
const Thought = require('../models/Thought');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            // populating the thoughts and friends properties of the user so that we can see the actual thoughts and friends, not just the IDs
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v');
        if (!users) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(user);
        await Thought.deleteMany({ username: user.username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await User.deleteOne({username: user.username });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// add friend
const addFriend = async (req, res) => {
    try {
        const friend = await User.findById(req.params.friendId);

        if (!friend) {
            return res.status(404).json({ error: 'Friend not found' });
        }

        const user = await User.findByIdAndUpdate(req.params.id, 
            { $push: { friends: req.params.friendId } }, 
            { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


// remove friend
const removeFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, 
            { $pull: { friends: req.params.friendId } }, 
            { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
};