const router = require('express').Router()
const {
    getAllUsers,
    createUser,
    getUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:userId').get(getUser).delete(deleteUser).put(updateUser)

router.route('/:userId/addFriend/:friendId').post(addFriend).delete(removeFriend)

module.exports = router;