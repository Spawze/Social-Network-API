const { User, Thought } = require('../models')

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find().select('-__v')

            res.json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async getUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v')
            console.log(user)
            if (!user) {
                return res.status(404).json({ message: "Could not find a user with that ID" })
            }
            const userThoughts = JSON.stringify(user.thoughts) 
            console.log(userThoughts)
            res.json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)

        }
    },
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId })
            if (!deletedUser) {
                return res.status(404).json({ message: "Could not find a user with that ID" })
            }

            //cascade delete all associated thoughts
            const userThoughts = deletedUser.thoughts
            for (let i = 0; i < userThoughts.length; i++) {
                const deletedThought = await Thought.findOneAndDelete({_id: userThoughts[i]})
            }
            res.json(deletedUser)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true, runValidators: true })
            console.log(updatedUser)
            if (!updatedUser) {
                return res.status(404).json({ message: "Could not find a user with that ID" })
            }
            res.json(updatedUser)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async addFriend(req, res) {
        try {
            const userId = req.params.userId
            const friendId = req.params.friendId

            const friendToAdd = await User.findOne({ _id: friendId })
            if (!friendToAdd) {
                return res.status(404).json({ message: "No user found for friend ID" })
            }
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { friends: friendId } },
                { new: true }
            )
            console.log(updatedUser)
            if (!updatedUser) {
                return res.status(404).json({ message: "No user found for user ID" })
            }
            res.json(updatedUser)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async removeFriend(req, res) {
        try {
            const userId = req.params.userId
            const friendId = req.params.friendId
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { friends: friendId } },
                {new: true}
            )
            if(!updatedUser){
                return res.status(404).json({ message: "Could not find a user with that ID" })
            }
            res.json(updatedUser)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}