const {ObjectId} = require('mongoose').Types
const {User} = require('../models')

module.exports = {
    async getUser(req, res){
        try {
            const users = await User.find()

            res.json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createUser(req,res){
        try {
            const user = await User.create(req.body)
            console.log(user)
            res.json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)

        }
    }
}