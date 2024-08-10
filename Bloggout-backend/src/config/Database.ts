import { connect } from "mongoose";

export const dbConnection = async() => {
    try {
        await connect(process.env.MONGO_CNN!);
        console.log("BD Conectada.")
    } catch (error) {
        console.log(error);
        throw new Error("Error al concetar la base de datos.");
    }
}

