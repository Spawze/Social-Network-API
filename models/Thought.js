const { Schema, model, Types } = require("mongoose")

//reaction schema is only to be used in the thought schema
const reactionSchema = new Schema(
    {
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
            get: formatDate,
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

//formats a date to be yyyy/mm/dd
function formatDate(date) {
    const yyyy = date.getFullYear()
    const mm = date.getMonth() + 1
    const dd = date.getDate()

    return (yyyy + '/' + mm + '/' + dd)
}

const Thought = model('thought', thoughtSchema)

module.exports = Thought