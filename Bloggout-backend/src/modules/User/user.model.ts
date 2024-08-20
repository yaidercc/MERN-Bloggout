import { model, Schema } from "mongoose"


const User = new Schema({
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
        required: true,
        unique: true
    },
    password: {
        type: String,

    }

})

const UserModel = model("User", User)

export default UserModel