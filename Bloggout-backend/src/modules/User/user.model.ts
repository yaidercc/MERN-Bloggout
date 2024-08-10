const { Model, Schema } = require("mongoose")


const User = Schema({
    names: {
        type: String,
        required: true
    },
    last_names: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        
    }

})