const { Thought, User } = require('../models')

module.exports = {
    //returns all thoughts in the DB
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v')

            res.json(thoughts)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    //returns one thought, from ID in the req params
    async getThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v')
            if (!thought) {
                return res.status(404).json({ message: "No thought found with that ID" })
            }
            res.json(thought)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    
    //creates and returns a thought with the info in req body
    async createThought(req, res) {
        try {
            const userId = req.body.userId
            const thoughtText = req.body.thoughtText
            const findUser = await User.findOne({ _id: userId })
            if (!findUser) {
                return res.status(404).json({ message: "No user found with that ID" })
            }
            const username = findUser.username

            console.log(username, thoughtText)

            const newThought = await Thought.create({ thoughtText: thoughtText, username: username })
            //add thought ID to the associated user
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { thoughts: newThought._id } })

            res.json(newThought)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    //updates and returns a thought 
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.body.thoughtId },
                { $set: { thoughtText: req.body.thoughtText } },
                { new: true }
            )
            if (!updatedThought) {
                return res.status(404).json({ message: "No thought found with that ID" })
            }
            res.json(updatedThought)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    //deletes and returns a thought
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })

            if (!deletedThought) {
                return res.status(404).json({ message: "No thought found with that ID" })
            }
            res.json(deletedThought)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    //creates a reaction and returns the thought it was attached to
    async createReaction(req, res) {
        try {
            const findUser = await User.findOne({ _id: req.body.userId })
            if (!findUser) {
                return res.status(404).json({ message: "No user found with that ID" })
            }
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: { reactionBody: req.body.reaction } } },
                { new: true }).select('-__v')
            if (!updatedThought) {
                return res.status(404).json({ message: "No thought found with that ID" })
            }
            res.json(updatedThought)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    //deletes a reaction 
    async deleteReaction(req, res) {
        try {
            
            const deletedReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: {_id: req.params.reactionId} } },
                {new: true})
            if (!deletedReaction) {
                return res.status(404).json({ message: "No thought found with that ID" })
            }
            res.json(deletedReaction)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}