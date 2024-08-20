import UserModel from "./user.model";
import { User } from "../../helpers/interfaces";
const createUser = async (userInfo: User) => {
    try {
        const findByUsername = await UserModel.findOne({ username: userInfo.username })

        if (findByUsername) {
            throw new Error("El nombre de usuario ya existe")
        }
        const newUser = new UserModel(userInfo)
        return newUser.save();
    } catch (error) {
        throw error;
    }
}

export default {
    createUser
}