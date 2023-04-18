const { Schema, model } = require("mongoose")


//simple regex tester to test for a valid email address.
const emailReg =  /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
function emailValidator(val){
    return emailReg.test(val)
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            max_length: 20,
            unique: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: [emailValidator, 'Invalid email address']

        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

userSchema.virtual('friendCount').get( function (){
    return this.friends.length
})

const User = model('user', userSchema)

module.exports = User;