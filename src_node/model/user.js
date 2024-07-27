//
//
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const objSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },

        email:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true
        },

        isverified:{
            type: Boolean,
            default: true
        },
        resetVerified:{
            type: Boolean,
            default: false,
        },

        courses:[
            {
                type:Schema.Types.ObjectId,
                required: false,
                ref:"Course",
            }
        ],

        preferences:[{type:String}],

        Bookmark:[
            {
                type:Schema.Types.ObjectId,
                required:false,
                ref:"Course",
            }]

        //Token:String,
        //resetToken:String,
        //resetTokenExpiration:Date,
    },
    {
        timestamps: true,
        collection: 'user'
    }

)

module.exports = mongoose.model('User', objSchema)
