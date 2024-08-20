import { Request, Response } from "express"
import userServices from "./user.services";
import bcrypt from "bcryptjs";

const createUser = async (req: Request, res: Response) => {
    try {
        const { password, ...user } = req.body;

        const salt = bcrypt.genSaltSync();
        const encPassword = bcrypt.hashSync(password, salt);

        await userServices.createUser({ ...user, password: encPassword })

        return res.json({
            success: true,
            msg: "Usuario creado con exito."
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Hubo un error en el servidor'
            });
        }
    }
};

const editUser = async (req: Request, res: Response) => {
    
};

const deleteUser = async (req: Request, res: Response) => { };

export default {
    createUser,
    editUser,
    deleteUser,
}