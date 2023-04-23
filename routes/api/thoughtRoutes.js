const router = require('express').Router()

const { 
    getAllThoughts,
    getThought, 
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought).put(updateThought)
router.route('/:thoughtId').get(getThought).delete(deleteThought)
router.route('/:thoughtId/reactions').post(createReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;