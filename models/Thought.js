const { Schema, model } = require("mongoose")

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: format,
    }
})

const thoughtSchema = new Schema({
    thoughText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: format,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
})

//formats a date to be yyyy/mm/dd
function format(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    //this add a 0 before the day or month if it's only a one digit number
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return year + '/' + month + '/' + day
}

const Thought = model('thought', thoughtSchema)

module.exports = Thought