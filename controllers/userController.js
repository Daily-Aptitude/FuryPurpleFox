const User = require('../models/users');

exports.registerUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getUserProfileByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.send({ user_id: user._id, email: user.email, username: user.username, streak: user.streak });
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).send({ message: "Failed to retrieve user profile", error });
    }
};

exports.updateUserProfileByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOneAndUpdate({ username: username }, req.body, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.send(user);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).send({ message: "Failed to update user profile", error });
    }
};